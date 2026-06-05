import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full pt-20 pb-8 bg-surface-container border-t border-outline/10">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-2">
          <div className="font-headline-lg text-3xl text-primary mb-6">PANEL</div>
          <p className="font-body-md text-secondary max-w-sm mb-8">
            L'excellence de la gastronomie française à votre table. Des sauces d'exception pour des moments inoubliables.
          </p>
        </div>
        <div>
          <h6 className="font-label-md text-sm uppercase tracking-widest text-on-surface mb-6">Navigation</h6>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/products" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
                Produits
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
                Notre Histoire
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="font-label-md text-sm uppercase tracking-widest text-on-surface mb-6">Informations</h6>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
                Mentions Légales
              </Link>
            </li>
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
                Livraison
              </Link>
            </li>
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
                CGV
              </Link>
            </li>
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
                Confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 mt-20 pt-8 border-t border-outline/5 text-center md:text-left">
        <p className="font-body-md text-secondary opacity-60">© 2026 PANEL Gastronomie. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
