'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="pt-32 pb-20 px-5 md:px-16 min-h-screen">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-20">
          <span className="font-label-md text-sm text-primary tracking-widest uppercase mb-4 block text-center">Contact</span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-4xl md:text-6xl text-on-surface text-center mb-8">
            Nous sommes à votre <span className="text-primary">écoute.</span>
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto text-center">
            Une question sur nos produits, une demande de partenariat ou simplement envie de nous dire bonjour ? N'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline-md text-xl font-semibold mb-1">Email</h4>
                  <p className="font-body-md text-on-surface-variant">contact@panel-gourmet.com</p>
                  <p className="font-body-md text-on-surface-variant">presse@panel-gourmet.com</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline-md text-xl font-semibold mb-1">Téléphone</h4>
                  <p className="font-body-md text-on-surface-variant">+33 (0) 1 23 45 67 89</p>
                  <p className="font-body-md text-on-surface-variant">Lun - Ven, 9h - 18h</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline-md text-xl font-semibold mb-1">Boutique & Atelier</h4>
                  <p className="font-body-md text-on-surface-variant">42 Rue de l'Excellence</p>
                  <p className="font-body-md text-on-surface-variant">75001 Paris, France</p>
                </div>
              </div>
            </div>

            <div className="p-10 bg-surface-container-low rounded-[2rem] border border-outline/5">
              <h4 className="font-headline-md text-xl font-semibold mb-6 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                Suivez-nous
              </h4>
              <div className="flex gap-4">
                {[MessageSquare, Mail, Globe].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full border border-outline/10 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 md:p-16 rounded-[3rem] border border-outline/5 shadow-[0_40px_80px_rgba(112,90,76,0.06)]"
            >
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Prénom</label>
                    <input type="text" className="w-full h-14 px-6 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Nom</label>
                    <input type="text" className="w-full h-14 px-6 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Objet</label>
                  <select className="w-full h-14 px-6 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                    <option>Question sur les produits</option>
                    <option>Suivi de commande</option>
                    <option>Partenariat professionnel</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Message</label>
                  <textarea rows={6} className="w-full p-6 rounded-xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all resize-none"></textarea>
                </div>
                <button className="w-full h-16 bg-primary text-on-primary rounded-full font-label-md uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-primary-container transition-all shadow-xl shadow-primary/10">
                  <Send className="w-4 h-4" />
                  Envoyer le message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
