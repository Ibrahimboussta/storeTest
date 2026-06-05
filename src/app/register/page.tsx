'use client';

import { signup } from '@/lib/supabase/actions';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <main className="pt-32 pb-20 px-5 flex items-center justify-center min-h-screen bg-surface-container-lowest">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-12 rounded-[2.5rem] border border-outline/5 shadow-2xl shadow-primary/5"
      >
        <div className="text-center mb-10">
          <Link href="/" className="font-display-lg text-3xl text-primary mb-6 inline-block">PANEL</Link>
          <h1 className="font-headline-lg text-2xl font-semibold mb-2">Créer un compte</h1>
          <p className="font-body-md text-on-surface-variant">Rejoignez l'univers Panel</p>
        </div>

        <form action={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Nom complet</label>
            <div className="relative">
              <input required name="fullName" type="text" placeholder="Jean Dupont" className="w-full h-14 px-12 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all font-body-md" />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Email</label>
            <div className="relative">
              <input required name="email" type="email" placeholder="votre@email.com" className="w-full h-14 px-12 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all font-body-md" />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Mot de passe</label>
            <div className="relative">
              <input required name="password" type="password" placeholder="••••••••" className="w-full h-14 px-12 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all font-body-md" />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
            </div>
          </div>

          {error && (
            <p className="text-error text-xs font-label-md bg-error/5 p-3 rounded-lg border border-error/10 text-center">
              {error}
            </p>
          )}

          <button 
            disabled={loading}
            className="w-full h-14 bg-secondary text-on-secondary rounded-full font-label-md uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-lg shadow-secondary/10 mt-8"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>S'inscrire <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <p className="text-center mt-8 font-body-md text-on-surface-variant text-sm">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-primary font-semibold hover:border-b border-primary transition-all">Se connecter</Link>
        </p>
      </motion.div>
    </main>
  );
}
