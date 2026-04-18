import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ChevronDown, Phone, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useActiveCategories } from '@/hooks/useCategories';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount, cartTotal } = useCart();
  const { data: categories = [] } = useActiveCategories();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCatMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const parentCategories = categories.filter(c => !c.parent_id);
  const hotline = "+60 10-839 6094"; // Example hotline from user image

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm">
      {/* Top Row: Logo & Main Nav */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/logos.png" alt="Bright Beam" className="h-10 lg:h-12 w-auto" />
            </Link>

            {/* Main Links */}
            <div className="hidden lg:flex items-center gap-8 font-body text-xs tracking-widest uppercase font-bold text-foreground">
              <Link to="/" className="hover:text-neon transition-colors duration-300">{t('nav.home')}</Link>
              <Link to="/shop" className="hover:text-neon transition-colors duration-300">{t('nav.shop')}</Link>
              <Link to="/about" className="hover:text-neon transition-colors duration-300">{t('footer.about')}</Link>
              <Link to="/contact" className="hover:text-neon transition-colors duration-300">{t('footer.contact')}</Link>
            </div>

            {/* Right Side Info */}
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Hotline:</span>
                <a href={`tel:${hotline}`} className="text-sm font-heading font-black text-foreground hover:text-neon transition-colors">{hotline}</a>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <button className="lg:hidden text-foreground hover:text-neon transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Actions Bar */}
      <div className="hidden lg:block bg-[#0A192F] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center h-14 gap-8">
            {/* All Categories Dropdown */}
            <div className="relative h-full" ref={dropdownRef}>
              <button 
                className="flex items-center gap-3 bg-neon h-full px-6 text-accent-foreground font-heading font-bold uppercase tracking-wider text-sm hover:brightness-110 transition-all"
                onClick={() => setCatMenuOpen(!catMenuOpen)}
              >
                <Menu className="w-5 h-5" />
                <span>All Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${catMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {catMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-lg overflow-hidden border border-border z-[100]"
                  >
                    <div className="py-2">
                      {parentCategories.length > 0 ? parentCategories.map(cat => (
                        <Link 
                          key={cat.id} 
                          to={`/shop?category=${cat.slug}`}
                          className="flex items-center px-6 py-3 text-sm text-foreground hover:bg-neon/10 hover:text-neon font-body transition-colors border-b border-border/50 last:border-0"
                          onClick={() => setCatMenuOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      )) : (
                        <div className="px-6 py-3 text-sm text-muted-foreground italic">No categories</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Bar - Centered */}
            <div className="flex-1 flex justify-center h-full items-center">
              <form onSubmit={handleSearch} className="w-full max-w-2xl relative h-10">
                <input 
                  type="text" 
                  placeholder="Search laptops, components, accessories..." 
                  className="w-full h-full bg-white/10 border border-white/20 rounded-md px-4 pr-12 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-neon focus:bg-white/15 transition-all font-body"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-neon/80 hover:bg-neon text-accent-foreground rounded-r-md transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Shopping Cart Side */}
            <Link to="/cart" className="flex items-center gap-3 hover:text-neon transition-colors ml-auto group">
              <div className="relative">
                <div className="bg-white/10 p-2 rounded-full group-hover:bg-neon group-hover:text-accent-foreground transition-all">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-neon text-accent-foreground rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-[#0A192F]">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">My Cart</span>
                <span className="text-sm font-heading font-black">RM {cartTotal.toFixed(2)}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-secondary py-3 px-4 rounded-md text-sm border border-border focus:ring-1 focus:ring-neon focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search className="w-5 h-5" />
                </button>
              </form>

              <div className="flex flex-col gap-2 font-body text-sm tracking-widest uppercase font-bold text-foreground">
                <Link to="/" onClick={() => setMobileOpen(false)} className="hover:text-neon py-3 border-b border-border/50">{t('nav.home')}</Link>
                <Link to="/shop" onClick={() => setMobileOpen(false)} className="hover:text-neon py-3 border-b border-border/50">{t('nav.shop')}</Link>
                
                {/* Mobile Categories Accordion would go here, using a simpler list for now */}
                <div className="py-2">
                  <p className="text-[10px] text-muted-foreground mb-2">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {parentCategories.map(cat => (
                      <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setMobileOpen(false)} className="text-[11px] bg-secondary px-3 py-1.5 rounded-full hover:bg-neon hover:text-accent-foreground transition-all">
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Hotline:</span>
                  <span className="text-sm font-bold">{hotline}</span>
                </div>
                <div className="flex items-center gap-4">
                  <LanguageSwitcher />
                  <Link to="/cart" onClick={() => setMobileOpen(false)} className="relative bg-neon/10 p-2 rounded-full text-neon">
                    <ShoppingBag className="w-6 h-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-neon text-accent-foreground rounded-full text-[10px] flex items-center justify-center font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
