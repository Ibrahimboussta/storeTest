'use client';

import { useState } from 'react';
import { updateUserProfile } from '@/lib/supabase/actions';
import { Loader2, User, Mail, Save, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsClient({ profile }: { profile: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData(e.currentTarget);
    const result = await updateUserProfile(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Une erreur est survenue' });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-[2.5rem] border border-outline/5 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                <User className="w-4 h-4 opacity-40" />
                Nom Complet
              </label>
              <input 
                required 
                name="fullName" 
                defaultValue={profile?.full_name} 
                className="w-full h-14 px-6 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all font-medium" 
              />
            </div>
            <div className="space-y-2 opacity-50">
              <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                <Mail className="w-4 h-4 opacity-40" />
                Email (Non modifiable)
              </label>
              <input 
                disabled 
                value={profile?.id ? 'admin@panel.com' : ''} 
                className="w-full h-14 px-6 rounded-xl bg-surface-container-low border border-outline/10 cursor-not-allowed" 
              />
            </div>
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl text-sm font-label-md uppercase tracking-wider ${
              message.type === 'success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
            }`}>
              {message.text}
            </div>
          )}

          <button 
            disabled={loading}
            className="inline-flex items-center gap-3 bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-sm uppercase tracking-widest hover:bg-primary-container transition-all shadow-xl shadow-primary/10 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Enregistrer les modifications
          </button>
        </form>
      </motion.div>

      <div className="bg-surface-container-low/50 p-8 rounded-[2rem] border border-outline/5">
        <h3 className="font-headline-md text-lg font-semibold mb-4 flex items-center gap-2 text-on-surface-variant">
          <AlertCircle className="w-5 h-5 opacity-40" />
          Note Administrative
        </h3>
        <p className="text-sm text-on-surface-variant/60 leading-relaxed">
          En tant qu'administrateur, vous gérez les commandes, les produits et l'inventaire. 
          Pour changer votre adresse email de connexion ou votre mot de passe, veuillez contacter le support technique ou utiliser la console Supabase.
        </p>
      </div>
    </div>
  );
}

