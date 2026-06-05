'use client';

import { useState, useRef } from 'react';
import { Upload, FileDown, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import { bulkImportProducts } from '@/lib/supabase/actions';
import { useRouter } from 'next/navigation';

interface ProductImportProps {
  categories: any[];
}

export default function ProductImport({ categories }: ProductImportProps) {
  const [loading, setLoading] = useState(false);
  const [showStatus, setShowStatus] = useState<'success' | 'error' | null>(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setShowStatus(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const rawData = results.data as any[];
          
          if (rawData.length === 0) {
            setMessage('Le fichier CSV est vide.');
            setShowStatus('error');
            setLoading(false);
            return;
          }

          // Map CSV data to product structure
          const productsToImport = rawData.map(row => {
            const categoryName = row.category || row.categorie;
            const category = categories.find(c => 
              c.name.toLowerCase() === categoryName?.toLowerCase()
            );

            const name = row.name || row.nom;
            const price = parseFloat(row.price || row.prix || '0');
            const old_price = row.old_price || row.ancien_prix ? parseFloat(row.old_price || row.ancien_prix) : null;

            return {
              name,
              slug: name.toLowerCase().trim().replace(/\s+/g, '-'),
              price,
              old_price,
              description: row.description || '',
              category_id: category?.id || categories[0]?.id,
              stock_quantity: parseInt(row.stock || row.quantite || '100'),
              image_url: row.image || row.image_url || '',
              images: row.image || row.image_url ? [row.image || row.image_url] : [],
              badge: row.badge || '',
              is_sold_out: row.is_sold_out === 'true' || row.rupture === 'true'
            };
          });

          const result = await bulkImportProducts(productsToImport);

          if (result.success) {
            setMessage(`${productsToImport.length} produits importés avec succès !`);
            setShowStatus('success');
            router.refresh();
          } else {
            setMessage(`Erreur d'importation: ${result.error}`);
            setShowStatus('error');
          }
        } catch (err: any) {
          setMessage(`Erreur critique: ${err.message}`);
          setShowStatus('error');
        } finally {
          setLoading(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      },
      error: (error) => {
        setMessage(`Erreur de lecture CSV: ${error.message}`);
        setShowStatus('error');
        setLoading(false);
      }
    });
  };

  const downloadTemplate = () => {
    const headers = ['name', 'price', 'old_price', 'category', 'description', 'stock', 'image_url', 'badge', 'is_sold_out'];
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "template_produits.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2">
        <button 
          onClick={downloadTemplate}
          className="flex items-center gap-2 bg-surface-container text-on-surface-variant px-4 py-2.5 rounded-full font-label-md text-xs uppercase tracking-widest hover:bg-outline/10 transition-all"
          title="Télécharger le modèle CSV"
        >
          <FileDown className="w-4 h-4" />
          Modèle
        </button>
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="flex items-center gap-2 bg-secondary text-on-secondary px-6 py-2.5 rounded-full font-label-md text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-secondary/10 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          Importer CSV
        </button>
      </div>
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".csv"
        className="hidden"
      />
      
      {showStatus && (
        <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg ${
          showStatus === 'success' ? 'text-success bg-success/10' : 'text-error bg-error/10'
        }`}>
          {showStatus === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
          {message}
        </div>
      )}
    </div>
  );
}
