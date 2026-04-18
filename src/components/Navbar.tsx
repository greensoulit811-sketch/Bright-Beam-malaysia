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
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
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
  const diySubCategories = categories.filter(c => c.parent_id !== null).slice(0, 8); 
  const hotline = "+60 19-322 2058"; 

  const navLinks = [
    { title: 'DIY PC Packages', dropdown: true, items: diySubCategories },
    { title: 'Commercial', dropdown: false },
    { title: 'Become A Dealer', dropdown: false },
    { title: 'Pricelist', dropdown: false },
    { title: 'Quotation', dropdown: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Top Row: Logo, Centered Nav & Hotline */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16 lg:h-20">
            {/* Logo Side - Left */}
            <div className="flex-shrink-0 w-40 lg:w-48">
              <Link to="/" className="flex items-center">
                <img src="/logos.png" alt="Bright Beam" className="h-8 lg:h-12 w-auto" />
              </Link>
            </div>

            {/* Main Links - Perfectly Centered */}
            <div className="hidden lg:flex flex-1 justify-center h-full overflow-hidden">
              <div className="flex items-center gap-4 xl:gap-8 h-full">
                {navLinks.map((link) => (
                  <div 
                    key={link.title} 
                    className="relative h-20 flex items-center group cursor-pointer"
                    onMouseEnter={() => setHoveredLink(link.title)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <div className={`flex items-center gap-1 text-[11px] xl:text-[13px] font-bold uppercase tracking-tight text-gray-700 transition-colors group-hover:text-blue-600 whitespace-nowrap ${hoveredLink === link.title ? 'text-blue-600' : ''}`}>
                      {link.title}
                      {link.dropdown && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${hoveredLink === link.title ? 'rotate-180' : ''}`} />}
                    </div>
                    
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transition-transform duration-300 ${hoveredLink === link.title ? 'scale-x-100' : 'scale-x-0'}`} />

                    <AnimatePresence>
                      {link.dropdown && hoveredLink === link.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white shadow-xl border border-gray-100 py-3 z-[110]"
                        >
                          {link.items && link.items.length > 0 ? link.items.map((item) => (
                            <Link 
                              key={item.id} 
                              to={`/shop?category=${item.slug}`}
                              className="block px-6 py-2.5 text-[12px] font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors uppercase"
                              onClick={() => setHoveredLink(null)}
                            >
                              {item.name}
                            </Link>
                          )) : (
                            ['Intel', 'AMD', 'Nvidia', 'Home & Office'].map(item => (
                              <Link 
                                key={item} 
                                to={`/shop?search=${item}`}
                                className="block px-6 py-2.5 text-[12px] font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors uppercase"
                                onClick={() => setHoveredLink(null)}
                              >
                                {item}
                              </Link>
                            ))
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Hotline & LanguageSwitcher */}
            <div className="hidden lg:flex flex-shrink-0 justify-end items-center gap-4 xl:gap-8">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 font-bold leading-none uppercase tracking-tight">Hotline:</span>
                <a href={`tel:${hotline}`} className="text-[14px] xl:text-[16px] font-black text-[#0A2342] whitespace-nowrap">{hotline}</a>
              </div>
              <div className="border-l pl-4 border-gray-100">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Menu Toggle & Cart */}
            <div className="lg:hidden ml-auto flex items-center gap-4">
              <Link to="/cart" className="relative group p-2">
                <ShoppingBag className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button className="text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Actions Bar */}
      <div className="bg-[#0A2342] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center h-14 lg:h-16 gap-3 lg:gap-12">
            
            {/* All Categories Dropdown */}
            <div className="relative h-full flex items-center" ref={dropdownRef}>
              <button 
                className="flex items-center gap-2 text-white font-bold uppercase text-[10px] lg:text-[12px] hover:text-blue-400 transition-colors whitespace-nowrap"
                onClick={() => setCatMenuOpen(!catMenuOpen)}
              >
                <Menu className="w-4 h-4 lg:w-5 h-5 flex-shrink-0" />
                <span className="hidden xs:inline">All Categories</span>
                <span className="xs:hidden">Categories</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${catMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {catMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-lg overflow-hidden border border-border z-[150]"
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

            {/* Search Bar */}
            <div className="flex-1 flex justify-center h-full items-center py-2 lg:py-0">
              <form onSubmit={handleSearch} className="w-full max-w-2xl relative h-9 lg:h-10 flex">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full h-full bg-white rounded-l-full px-4 lg:px-6 text-[12px] lg:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="h-full w-10 lg:w-14 flex items-center justify-center bg-[#5BC0DE] text-white rounded-r-full hover:bg-[#46b8da] transition-colors flex-shrink-0">
                  <Search className="w-4 h-4 lg:w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Shopping Cart */}
            <Link to="/cart" className="hidden lg:flex items-center gap-3 group shrink-0">
              <div className="relative">
                <ShoppingBag className="w-7 h-7 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-[#0A2342] rounded-full text-[11px] flex items-center justify-center font-bold border-2 border-[#0A2342]">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <span className="text-[16px] xl:text-[18px] font-black text-white uppercase tracking-tighter whitespace-nowrap">RM {cartTotal.toFixed(2)}</span>
              </div>
            </Link>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[200] lg:hidden bg-white"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <img src="/logos.png" alt="Logo" className="h-8 w-auto" />
                <button onClick={() => setMobileOpen(false)} className="p-2 border border-blue-600 rounded-full text-blue-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6 overflow-y-auto flex-1">
                {navLinks.map((link) => (
                  <div key={link.title} className="space-y-3">
                    <div className="flex items-center justify-between text-lg font-bold text-gray-800 uppercase">
                      {link.dropdown ? (
                        <span className="flex-1">{link.title}</span>
                      ) : (
                        <Link to="/shop" onClick={() => setMobileOpen(false)} className="flex-1">{link.title}</Link>
                      )}
                    </div>
                    {link.dropdown && (
                      <div className="grid grid-cols-2 gap-3 pl-4">
                        {link.items && link.items.length > 0 ? link.items.map((item) => (
                          <Link 
                            key={item.id} 
                            to={`/shop?category=${item.slug}`}
                            className="text-sm font-semibold text-gray-500 py-1"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )) : (
                          ['Intel', 'AMD', 'Nvidia', 'Home & Office'].map(item => (
                            <Link 
                              key={item} 
                              to={`/shop?search=${item}`}
                              className="text-sm font-semibold text-gray-500 py-1"
                              onClick={() => setMobileOpen(false)}
                            >
                              {item}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-tight">Hotline:</span>
                  <a href={`tel:${hotline}`} className="text-xl font-black text-[#0A2342]">{hotline}</a>
                </div>
                <div className="flex items-center justify-between">
                   <LanguageSwitcher />
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
