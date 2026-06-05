import { createClient } from './server';

export async function getProducts(): Promise<any[]> {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', JSON.stringify(error, null, 2));
    return [];
  }

  return (products || []) as any;
}

export async function getFeaturedProducts(): Promise<any[]> {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching featured products:', JSON.stringify(error, null, 2));
    return [];
  }

  return (products || []) as any;
}

export async function getProductBySlug(slug: string): Promise<any> {
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching product:', JSON.stringify(error, null, 2));
    return null;
  }

  return product as any;
}

export async function getCategories(): Promise<any[]> {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', JSON.stringify(error, null, 2));
    return [];
  }

  return (categories || []) as any;
}

export async function getOrders(): Promise<any[]> {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(name))')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', JSON.stringify(error, null, 2));
    return [];
  }

  return (orders || []) as any;
}
