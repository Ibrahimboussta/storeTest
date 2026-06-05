'use client';

import { motion } from 'framer-motion';
import { Camera, Heart, Leaf, Sparkles, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="pt-32 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="px-5 md:px-16 mb-32">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-label-md text-sm text-primary tracking-widest uppercase mb-4 block">Notre Histoire</span>
              <h1 className="font-display-lg text-4xl md:text-6xl text-on-surface mb-8 leading-tight">
                L'excellence en chaque <span className="text-primary">goutte.</span>
              </h1>
              <p className="font-body-lg text-lg text-on-surface-variant mb-8 leading-relaxed">
                Fondée en 2024 au cœur de Paris, Panel est née d'une vision simple : transformer des ingrédients bruts d'exception en sauces gastronomiques d'une pureté inégalée.
              </p>
              <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
                Nous croyons que le luxe réside dans la simplicité et la précision. C'est pourquoi nous n'utilisons aucun additif, aucun conservateur, seulement le meilleur de la nature.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn0fl9WqS3t_53uMcSBX_jl6hfICsUNjX3zIjJL1aqikkZsTjYwZaQiyZT5HheDUQbsz_r-aiyMqHkUrRgDR7_tVrNUmOaSK0NY0j6zzZIxw5mnEMf885B8ychYRvl-9jOu6kV6Q2Ww2CtojjC7d31y3yU6wFBBYiCYVj2ZT5Ko2VwQVP-l1fHVWG2N0OsuJYlWfMKh5fJ1rXiWaqc2lvi-T6hpsy-Di6MG2fmsJaGVtDovHbWKthkfrWq_B6MpyocDsIHP4HgKEMZ" 
                alt="Notre Atelier" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-5 md:px-16 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto text-center mb-20">
          <span className="font-label-md text-sm text-primary tracking-widest uppercase mb-4 block">Nos Valeurs</span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-semibold">Ce qui nous anime</h2>
        </div>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Leaf, title: "Pureté", desc: "100% naturel, sans compromis sur la qualité des ingrédients." },
            { icon: Sparkles, title: "Artisanat", desc: "Chaque flacon est rempli et scellé à la main dans nos ateliers." },
            { icon: Heart, title: "Passion", desc: "Une quête incessante de l'équilibre gustatif parfait." }
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-12 bg-white rounded-3xl border border-outline/5 text-center shadow-sm"
            >
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                <v.icon className="w-10 h-10" />
              </div>
              <h3 className="font-headline-md text-2xl font-semibold mb-4">{v.title}</h3>
              <p className="font-body-md text-on-surface-variant">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-32 px-5 md:px-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="space-y-12">
                {[
                  { step: "01", title: "Sourcing Éthique", desc: "Nous parcourons le monde pour trouver les meilleurs terroirs." },
                  { step: "02", title: "Extraction Lente", desc: "Un procédé de pressage à froid pour préserver tous les arômes." },
                  { step: "03", title: "Maturation", desc: "Nos sauces reposent pour atteindre leur plénitude aromatique." }
                ].map((s, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-8"
                  >
                    <span className="font-display-lg text-4xl text-primary/20 leading-none">{s.step}</span>
                    <div>
                      <h4 className="font-headline-md text-xl font-semibold mb-2">{s.title}</h4>
                      <p className="font-body-md text-on-surface-variant">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCShbBm3xqsP_WuMXCnfLCPxNA6wHdQD4jejs9tKrQVmylhna45yFxFnwla0mBjkWElgTd4UCYYuGfKFRbAlQKg8eMGOzd_WlXsvow1WUKGgAhdOQ-saaa1ysaUG1rqjlyi23B5QXNRA4lo9MPCru_qWfwjkbD0diSQuRI2q43N3Jhjd3pZ3MuV4D6-0VedGGp29yPyJGe5_0Ec2hffL7m9B7dJV5vrn0WxDQfet8nViJ5l0MBTIdNvv-odNe08-8KtlU3vUWs02-fb" 
                alt="Process" 
                className="rounded-[3rem] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 bg-secondary text-on-secondary">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div>
            <div className="font-display-lg text-5xl mb-2">24</div>
            <p className="font-label-md text-sm uppercase tracking-widest opacity-60">Pays Livrés</p>
          </div>
          <div>
            <div className="font-display-lg text-5xl mb-2">12k</div>
            <p className="font-label-md text-sm uppercase tracking-widest opacity-60">Clients Heureux</p>
          </div>
          <div>
            <div className="font-display-lg text-5xl mb-2">5</div>
            <p className="font-label-md text-sm uppercase tracking-widest opacity-60">Awards Gastronomie</p>
          </div>
          <div>
            <div className="font-display-lg text-5xl mb-2">100%</div>
            <p className="font-label-md text-sm uppercase tracking-widest opacity-60">Naturel</p>
          </div>
        </div>
      </section>
    </main>
  );
}
