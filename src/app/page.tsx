import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Sparkles, Truck, ShieldCheck, Quote, Camera } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/supabase/queries';
import { ProductCard } from '@/components/features/ProductCard';

const testimonials = [
  {
    id: 1,
    content: "Une révélation culinaire. La sauce caramel est d'une onctuosité incomparable. Chaque cuillère est un voyage.",
    author: "Marie L.",
    role: "Chef Pâtissière",
    avatar: "https://i.pravatar.cc/150?u=marie"
  },
  {
    id: 2,
    content: "Le packaging est aussi sublime que le produit. C'est l'idée cadeau parfaite pour les amateurs de gastronomie.",
    author: "Thomas D.",
    role: "Épicurien",
    avatar: "https://i.pravatar.cc/150?u=thomas"
  },
  {
    id: 3,
    content: "L'équilibre des saveurs est parfait. On sent la qualité des ingrédients dès la première dégustation.",
    author: "Sophie R.",
    role: "Blogueuse Culinaire",
    avatar: "https://i.pravatar.cc/150?u=sophie"
  }
];

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[921px] flex items-center overflow-hidden px-5 md:px-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center w-full">
          <div className="z-10 order-2 lg:order-1">
            <span className="font-label-md text-sm text-primary tracking-widest uppercase mb-4 block">
              Héritage Gastronomique
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-4xl md:text-6xl text-on-surface mb-6 leading-tight font-bold">
              L'art de la sauce, <br />réinventé pour <span className="text-primary">l'excellence.</span>
            </h1>
            <p className="font-body-lg text-lg text-on-surface-variant max-w-xl mb-10">
              Une fusion parfaite entre savoir-faire ancestral français et précision contemporaine. Découvrez des saveurs pures, sans compromis.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-sm uppercase tracking-widest hover:bg-primary-container transition-all duration-300 shadow-xl"
              >
                Découvrir la collection
              </Link>
              <Link
                href="/about"
                className="border border-outline px-10 py-4 rounded-full font-label-md text-sm uppercase tracking-widest hover:bg-surface-container transition-all duration-300"
              >
                Notre procédé
              </Link>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 h-[400px] lg:h-[700px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-[2rem] -rotate-3 translate-x-4"></div>
            <img
              alt="Hero Image"
              className="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCShbBm3xqsP_WuMXCnfLCPxNA6wHdQD4jejs9tKrQVmylhna45yFxFnwla0mBjkWElgTd4UCYYuGfKFRbAlQKg8eMGOzd_WlXsvow1WUKGgAhdOQ-saaa1ysaUG1rqjlyi23B5QXNRA4lo9MPCru_qWfwjkbD0diSQuRI2q43N3Jhjd3pZ3MuV4D6-0VedGGp29yPyJGe5_0Ec2hffL7m9B7dJV5vrn0WxDQfet8nViJ5l0MBTIdNvv-odNe08-8KtlU3vUWs02-fb"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-5 md:px-16 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="font-label-md text-sm text-primary tracking-widest uppercase mb-2 block">
                Le Grand Classique
              </span>
              <h2 className="font-headline-lg text-3xl font-semibold text-on-surface">Produits Vedettes</h2>
            </div>
            <Link
              href="/products"
              className="text-primary font-label-md text-sm uppercase tracking-widest border-b border-primary hover:opacity-70 transition-all"
            >
              Voir tout le catalogue
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} layout="home" />
            ))}
          </div>
        </div>
      </section>

      {/* Flavor Collection Immersive Section (Bento Style) */}
      <section className="py-20 px-5 md:px-16 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 text-center">
            <span className="font-label-md text-sm text-primary tracking-widest uppercase mb-2 block">
              Palette Aromatique
            </span>
            <h2 className="font-headline-lg text-3xl font-semibold text-on-surface">Collection des Saveurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 grid-rows-2 gap-4 h-auto lg:h-[600px]">
            {/* Fraise */}
            <div className="md:col-span-2 lg:col-span-2 row-span-1 bg-[#fff5f5] rounded-2xl p-8 flex flex-col justify-between relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="z-10">
                <span className="font-label-md text-sm text-primary uppercase tracking-widest">Éclat</span>
                <h3 className="font-headline-lg text-3xl font-semibold mt-2">Fraise</h3>
              </div>
              <p className="z-10 font-body-md text-on-surface-variant">
                L'intensité pure du fruit rouge fraîchement cueilli.
              </p>
            </div>
            {/* Chocolat */}
            <div className="md:col-span-2 lg:col-span-2 row-span-2 bg-[#2d1b18] rounded-2xl p-8 flex flex-col justify-between text-[#fff6f0] relative overflow-hidden group">
              <img
                alt="Dark Chocolate"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeFFUk9RXCkkXgVKr2BeQ-lbZrUk8B3HFzhJ58kBpt3-8-8gqhpV26GzQxYob-ByrmVXbL6rCX2mwwsiO0yeAYBnl_kmogYNA8MOTanL9fyWxIXaZI67z_69p2fuoBFJpuIpVOFebB1WZaTFD_LbpfBrkbIPpmSTZ753c0sJlVWWzWf_Z3fLE_KQrrAYA8PLXbc2pE0JqLKApLdU4iT12Tp-E-lrwH0pdgGSKSUskOUcuPHaRo2qRi-w9LZHcKvagGTgGWwFsCTqbv"
              />
              <div className="z-10">
                <span className="font-label-md text-sm uppercase tracking-widest opacity-80">Profondeur</span>
                <h3 className="font-headline-lg text-3xl font-semibold mt-2 text-white">Chocolat</h3>
              </div>
              <p className="z-10 font-body-md text-white/80">
                Un assemblage secret de fèves rares pour une longueur en bouche exceptionnelle.
              </p>
            </div>
            {/* Caramel */}
            <div className="md:col-span-2 lg:col-span-2 row-span-1 bg-[#fffaf0] rounded-2xl p-8 flex flex-col justify-between border border-[#7a510c]/10 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f5bc70]/20 to-transparent"></div>
              <div className="z-10">
                <span className="font-label-md text-sm text-[#7a510c] uppercase tracking-widest">Onctueux</span>
                <h3 className="font-headline-lg text-3xl font-semibold mt-2">Caramel</h3>
              </div>
              <p className="z-10 font-body-md text-on-surface-variant">
                La douceur dorée infusée à la fleur de sel de Guérande.
              </p>
            </div>
            {/* Vanille */}
            <div className="md:col-span-2 lg:col-span-2 row-span-1 bg-white rounded-2xl p-8 flex flex-col justify-between shadow-sm relative group overflow-hidden border border-outline/5">
              <div className="z-10">
                <span className="font-label-md text-sm text-secondary uppercase tracking-widest">Pureté</span>
                <h3 className="font-headline-lg text-3xl font-semibold mt-2">Vanille</h3>
              </div>
              <p className="z-10 font-body-md text-on-surface-variant">
                Gousses de Madagascar Bourbon pour une fragrance envoûtante.
              </p>
            </div>
            {/* Pistache */}
            <div className="md:col-span-4 lg:col-span-2 row-span-1 bg-[#f1f8e9] rounded-2xl p-8 flex flex-col justify-between relative group overflow-hidden">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#81c784]/10 rounded-full -mr-20 -mb-20"></div>
              <div className="z-10">
                <span className="font-label-md text-sm text-[#2e7d32] uppercase tracking-widest">Rare</span>
                <h3 className="font-headline-lg text-3xl font-semibold mt-2">Pistache</h3>
              </div>
              <p className="z-10 font-body-md text-on-surface-variant">
                L'élégance du vert émeraude, grillée à la perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Panel */}
      <section className="py-20 px-5 md:px-16 bg-surface-container">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-8 bg-surface-container-lowest rounded-xl">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h4 className="font-headline-md text-xl font-semibold mb-4">Ingrédients Premium</h4>
              <p className="font-body-md text-on-surface-variant">
                Sélection rigoureuse des meilleurs producteurs locaux et mondiaux.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-surface-container-lowest rounded-xl">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="font-headline-md text-xl font-semibold mb-4">Fabrication Artisanale</h4>
              <p className="font-body-md text-on-surface-variant">
                Chaque lot est préparé à la main dans nos ateliers parisiens.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-surface-container-lowest rounded-xl">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h4 className="font-headline-md text-xl font-semibold mb-4">Livraison Rapide</h4>
              <p className="font-body-md text-on-surface-variant">
                Expédition sécurisée sous 24h avec emballage protecteur isotherme.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-surface-container-lowest rounded-xl">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="font-headline-md text-xl font-semibold mb-4">Qualité Garantie</h4>
              <p className="font-body-md text-on-surface-variant">
                Satisfaction client totale ou remplacement immédiat de votre commande.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 md:px-16 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-label-md text-sm text-primary tracking-widest uppercase mb-4 block">
              Expériences
            </span>
            <h2 className="font-headline-lg text-3xl font-semibold text-on-surface">Ils ont goûté à l'exception</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testi, i) => (
              <div
                key={testi.id}
                className={`p-10 bg-white border border-outline/5 rounded-3xl shadow-[0_20px_40px_rgba(112,90,76,0.02)] italic relative ${
                  i === 2 ? 'lg:col-span-1 md:col-span-2' : ''
                }`}
              >
                <Quote className="w-16 h-16 text-primary/10 absolute -top-4 -left-2 rotate-180" />
                <p className="font-body-lg text-lg text-on-surface mb-8 relative z-10">{testi.content}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container border border-outline/10 overflow-hidden">
                    <img alt={testi.author} className="w-full h-full object-cover" src={testi.avatar} />
                  </div>
                  <div>
                    <h5 className="font-headline-md text-sm font-semibold mb-0.5">{testi.author}</h5>
                    <p className="text-on-surface-variant font-caption text-xs">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-5 md:px-16 bg-primary text-on-primary">
        <div className="max-w-[1280px] mx-auto text-center py-16 px-8 rounded-[3rem] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
          <h2 className="font-display-lg-mobile md:font-display-lg text-4xl md:text-6xl mb-8 font-bold">
            Rejoignez l'élite culinaire.
          </h2>
          <p className="font-body-lg text-lg mb-12 max-w-2xl mx-auto opacity-90">
            Inscrivez-vous à notre lettre d'information pour recevoir nos recettes exclusives et être informé de nos
            lancements de séries limitées.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              className="flex-grow rounded-full px-8 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              placeholder="Votre adresse email"
              type="email"
            />
            <button className="bg-white text-primary px-10 py-4 rounded-full font-label-md text-sm uppercase tracking-widest hover:bg-surface-container-low transition-all">
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
