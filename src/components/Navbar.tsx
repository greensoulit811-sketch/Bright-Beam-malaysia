import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useActiveCategories } from '@/hooks/useCategories';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useState } from 'react';

const Navbar = () => {
  const { cartCount } = useCart();
  const { data: categories = [] } = useActiveCategories();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const topCategories = categories.filter(c => !c.parent_id).slice(0, 3);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="SRK Collection" className="h-10 lg:h-12 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8 font-body text-sm tracking-widest uppercase font-medium text-foreground">
            <Link to="/" className="hover-neon transition-colors duration-300">{t('nav.home')}</Link>
            <Link to="/shop" className="hover-neon transition-colors duration-300">{t('nav.shop')}</Link>
            {topCategories.map(cat => (
              <Link key={cat.id} to={`/shop?category=${cat.slug}`} className="hover-neon transition-colors duration-300">
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 text-foreground">
            <LanguageSwitcher />
            <Link to="/shop" className="hover-neon transition-colors duration-300"><Search className="w-5 h-5" /></Link>
            <Link to="/wishlist" className="hover-neon transition-colors duration-300"><Heart className="w-5 h-5" /></Link>
            <Link to="/cart" className="hover-neon transition-colors duration-300 relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -end-2 w-5 h-5 bg-neon text-accent-foreground rounded-full text-xs flex items-center justify-center font-body font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden hover-neon transition-colors duration-300" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="flex flex-col px-4 py-6 gap-4 font-body text-sm tracking-widest uppercase font-medium text-foreground">
            <Link to="/" onClick={() => setMobileOpen(false)} className="hover-neon transition-colors py-2">{t('nav.home')}</Link>
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="hover-neon transition-colors py-2">{t('nav.shop')}</Link>
            {topCategories.map(cat => (
              <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setMobileOpen(false)} className="hover-neon transition-colors py-2">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
