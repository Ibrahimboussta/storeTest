'use server';

import { createClient } from './server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function getSession() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getUserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
}

export async function createOrder(orderData: any, cartItems: any[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // 1. Verify availability of all products
  const productIds = cartItems.map(item => item.id);
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, is_sold_out')
    .in('id', productIds);

  if (productsError) return { error: "Erreur de vérification du stock" };

  const soldOutItems = products?.filter(p => p.is_sold_out);
  if (soldOutItems && soldOutItems.length > 0) {
    return { error: `Désolé, les produits suivants sont en rupture de stock: ${soldOutItems.map(i => i.name).join(', ')}` };
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user?.id,
      total_amount: orderData.total,
      shipping_address: orderData.shippingAddress,
      status: 'pending',
    })
    .select()
    .single();

  if (orderError) {
    console.error('Order error:', orderError);
    return { error: orderError.message };
  }

  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Items error:', itemsError);
    return { error: itemsError.message };
  }

  // 3. Post order details to Google Sheets if Webhook URL is configured
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const productsStr = cartItems.map(item => `${item.quantity}x ${item.name}`).join(' | ');
      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const payload = {
        action: 'create',
        customer_name: `${orderData.shippingAddress?.firstName || ''} ${orderData.shippingAddress?.lastName || ''}`.trim(),
        phone: orderData.shippingAddress?.phone || 'N/A',
        city: orderData.shippingAddress?.city || 'N/A',
        address: orderData.shippingAddress?.address || 'N/A',
        products: productsStr,
        total: `${Number(orderData.total).toFixed(2)} DH`,
        status: 'En attente'
      };

      // Send asynchronously without blocking the user response
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.error('Google Sheets fetch background error:', err));

    } catch (sheetErr) {
      console.error('Error preparing Google Sheets payload:', sheetErr);
    }
  }

  return { success: true, orderId: order.id };
}

export async function updateUserProfile(formData: FormData) {
  const supabase = await createClient();
  const fullName = formData.get('fullName') as string;
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Non authentifié' };

  const { error } = await supabase
    .from('profiles')
    .update({ full_name: fullName })
    .eq('id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/settings');
  return { success: true };
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/products');
  return { success: true };
}

export async function getLatestOrders() {
  const { getOrders } = await import('./queries');
  return await getOrders();
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient();
  
  // Fetch order details to get the phone number for Google Sheets sync
  const { data: orderDetails } = await supabase
    .from('orders')
    .select('shipping_address')
    .eq('id', orderId)
    .single();

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);
    
  if (error) return { success: false, error: error.message };

  // Sync to Google Sheets if Webhook URL is configured
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl && orderDetails) {
    try {
      const map: Record<string, string> = {
        confirmed: 'Confirmer',
        pending: 'En attente',
        cancelled: 'Annuler',
        not_interested: 'Pas intéressé',
        no_response: 'Pas de réponse'
      };
      const mappedStatus = map[status] || status;

      const payload = {
        action: 'updateStatus',
        phone: orderDetails.shipping_address?.phone || 'N/A',
        status: mappedStatus
      };

      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.error('Google Sheets status sync background error:', err));

    } catch (sheetErr) {
      console.error('Error syncing order status to Google Sheets:', sheetErr);
    }
  }

  revalidatePath('/admin/orders');
  return { success: true };
}

export async function saveProduct(productData: any, productId?: string) {
  const supabase = await createClient();
  
  let result;
  if (productId) {
    result = await supabase.from('products').update(productData).eq('id', productId);
  } else {
    result = await supabase.from('products').insert(productData);
  }
  
  if (result.error) return { success: false, error: result.error.message };
  
  revalidatePath('/admin/products');
  return { success: true };
}

export async function bulkImportProducts(products: any[]) {
  const supabase = await createClient();
  const { error } = await supabase.from('products').insert(products);
  
  if (error) return { success: false, error: error.message };
  
  revalidatePath('/admin/products');
  return { success: true };
}

export async function bulkDeleteProducts(productIds: string[]) {
  const supabase = await createClient();
  const { error } = await supabase.from('products').delete().in('id', productIds);
  
  if (error) return { success: false, error: error.message };
  
  revalidatePath('/admin/products');
  return { success: true };
}

export async function updateStock(updates: { id: string, stock_quantity: number }[]) {
  const supabase = await createClient();
  
  // Perform updates in parallel
  const results = await Promise.all(
    updates.map(update => 
      supabase.from('products').update({ stock_quantity: update.stock_quantity }).eq('id', update.id)
    )
  );

  const error = results.find(r => r.error)?.error;
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/products');
  revalidatePath('/admin/inventory');
  revalidatePath('/admin');
  return { success: true };
}
