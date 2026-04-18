import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';
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
  const hotline = "+60 19-322 2058"; 

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Top Row: Logo & Main Nav (White Background) */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/logos.png" alt="Bright Beam" className="h-12 w-auto" />
            </Link>

            {/* Main Links & Hotline */}
            <div className="hidden lg:flex items-center gap-10">
              <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-tight text-gray-700">
                <Link to="/" className="hover:text-blue-600 transition-colors uppercase">DIY PC Packages</Link>
                <Link to="/shop" className="hover:text-blue-600 transition-colors uppercase">Commercial</Link>
                <Link to="/shop" className="hover:text-blue-600 transition-colors uppercase">Become A Dealer</Link>
                <Link to="/shop" className="hover:text-blue-600 transition-colors uppercase">Pricelist</Link>
                <Link to="/shop" className="hover:text-blue-600 transition-colors uppercase">Quotation</Link>
              </div>
              
              <div className="flex flex-col items-end border-l pl-8 border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold leading-none">Hotline:</span>
                <a href={`tel:${hotline}`} className="text-[14px] font-bold text-[#0A2342]">{hotline}</a>
              </div>
              
              <div className="pl-4">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Actions Bar (Dark Blue Background #0A2342) */}
      <div className="bg-[#0A2342] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16 gap-12">
            
            {/* All Categories Dropdown */}
            <div className="relative h-full flex items-center" ref={dropdownRef}>
              <button 
                className="flex items-center gap-2 text-white font-bold uppercase text-[12px] hover:text-blue-400 transition-colors"
                onClick={() => setCatMenuOpen(!catMenuOpen)}
              >
                <Menu className="w-5 h-5" />
                <span>All Categories</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${catMenuOpen ? 'rotate-180' : ''}`} />
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
                          className="flex items-center px-6 py-3 text-sm text-foreground hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors border-b border-gray-50 last:border-0"
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

            {/* Search Bar - Notebook Plaza Style */}
            <div className="flex-1 flex justify-center h-full items-center">
              <form onSubmit={handleSearch} className="w-full max-w-2xl relative h-10 flex">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full h-full bg-white rounded-l-full px-6 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="h-full w-14 flex items-center justify-center bg-[#5BC0DE] text-white rounded-r-full hover:bg-[#46b8da] transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Shopping Cart - Notebook Plaza Style */}
            <Link to="/cart" className="flex items-center gap-3 group shrink-0">
              <div className="relative">
                <ShoppingBag className="w-7 h-7 text-white" />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-[#0A2342] rounded-full text-[11px] flex items-center justify-center font-bold border-2 border-[#0A2342]">
                  {cartCount}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-[15px] font-bold text-white uppercase tracking-tighter">RM {cartTotal.toFixed(2)}</span>
              </div>
            </Link>

          </div>
        </div>
      </div>

      {/* Mobile Menu (Same compact design) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <form onSubmit={handleSearch} className="relative flex">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-gray-50 py-3 px-6 rounded-l-full text-sm border border-gray-200 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-[#5BC0DE] px-4 rounded-r-full text-white">
                  <Search className="w-5 h-5" />
                </button>
              </form>

              <div className="flex flex-col gap-1 font-bold text-[12px] uppercase text-gray-700">
                <Link to="/" onClick={() => setMobileOpen(false)} className="py-3 border-b border-gray-50 uppercase">Home</Link>
                <Link to="/shop" onClick={() => setMobileOpen(false)} className="py-3 border-b border-gray-50 uppercase">Shop</Link>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="py-3 border-b border-gray-50 uppercase">About Us</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="py-3 border-b border-gray-50 uppercase">Contact Us</Link>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Hotline:</span>
                  <span className="text-sm font-bold text-[#0A2342]">{hotline}</span>
                </div>
                <div className="flex items-center gap-4">
                  <LanguageSwitcher />
                  <Link to="/cart" onClick={() => setMobileOpen(false)} className="relative shrink-0">
                    <ShoppingBag className="w-7 h-7 text-[#0A2342]" />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0A2342] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
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
