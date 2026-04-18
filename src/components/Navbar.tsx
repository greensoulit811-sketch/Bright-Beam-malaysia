import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ChevronDown, Phone, Globe, LayoutGrid } from 'lucide-react';
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
      setMobileOpen(false);
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm lg:shadow-none">
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

            {/* Main Links - Perfectly Centered (Desktop) */}
            <div className="hidden lg:flex flex-1 justify-center h-full">
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

            {/* Right Side - Hotline & LanguageSwitcher (Desktop) */}
            <div className="hidden lg:flex flex-shrink-0 justify-end items-center gap-4 xl:gap-8">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 font-bold leading-none uppercase tracking-tight">Hotline:</span>
                <a href={`tel:${hotline}`} className="text-[14px] xl:text-[16px] font-black text-[#0A2342] whitespace-nowrap">{hotline}</a>
              </div>
              <div className="border-l pl-4 border-gray-100">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Header Actions (Visible only on mobile) */}
            <div className="lg:hidden ml-auto flex items-center gap-3">
              <Link to="/cart" className="relative p-2">
                <ShoppingBag className="w-6 h-6 text-[#0A2342]" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button 
                className="w-10 h-10 flex items-center justify-center bg-[#0A2342] text-white rounded-md" 
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Actions Bar (Desktop Only) */}
      <div className="hidden lg:block bg-[#0A2342] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16 gap-12">
            
            {/* All Categories Dropdown */}
            <div className="relative h-full flex items-center" ref={dropdownRef}>
              <button 
                className="flex items-center gap-2 text-white font-bold uppercase text-[12px] hover:text-blue-400 transition-colors whitespace-nowrap"
                onClick={() => setCatMenuOpen(!catMenuOpen)}
              >
                <Menu className="w-5 h-5 flex-shrink-0" />
                <span>All Categories</span>
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
            <div className="flex-1 flex justify-center h-full items-center">
              <form onSubmit={handleSearch} className="w-full max-w-2xl relative h-10 flex">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full h-full bg-white rounded-l-full px-6 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="h-full w-14 flex items-center justify-center bg-[#5BC0DE] text-white rounded-r-full hover:bg-[#46b8da] transition-colors flex-shrink-0">
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Shopping Cart */}
            <Link to="/cart" className="flex items-center gap-3 group shrink-0">
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

      {/* Mobile Drawer Design */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[210] lg:hidden overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <img src="/logos.png" alt="Logo" className="h-8 w-auto" />
                <button 
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-8">
                
                {/* Search in Drawer */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Search Products</h3>
                  <form onSubmit={handleSearch} className="relative flex shadow-sm">
                    <input 
                      type="text" 
                      placeholder="What are you looking for?" 
                      className="w-full bg-gray-50 py-3.5 px-6 rounded-l-xl text-sm border-y border-l border-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-100 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="bg-[#5BC0DE] px-5 rounded-r-xl text-white hover:bg-[#46b8da] transition-colors">
                      <Search className="w-5 h-5" />
                    </button>
                  </form>
                </div>

                {/* Main Navigation */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Main Menu</h3>
                  <div className="bg-gray-50 rounded-2xl p-2 space-y-1">
                    {navLinks.map((link) => (
                      <div key={link.title} className="group">
                        <div className="flex items-center justify-between p-3.5 text-sm font-bold text-[#0A2342] uppercase rounded-xl hover:bg-white hover:shadow-sm transition-all">
                          {link.dropdown ? (
                            <span className="flex-1">{link.title}</span>
                          ) : (
                            <Link to="/shop" onClick={() => setMobileOpen(false)} className="flex-1">{link.title}</Link>
                          )}
                          {link.dropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </div>
                        {link.dropdown && (
                          <div className="mt-1 ml-4 border-l-2 border-blue-50 space-y-1 py-1">
                            {link.items && link.items.length > 0 ? link.items.map((item) => (
                              <Link 
                                key={item.id} 
                                to={`/shop?category=${item.slug}`}
                                className="block px-4 py-2 text-[13px] font-semibold text-gray-500 hover:text-blue-600 transition-colors"
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.name}
                              </Link>
                            )) : (
                              ['Intel', 'AMD', 'Nvidia', 'Gaming Laptops'].map(item => (
                                <Link 
                                  key={item} 
                                  to={`/shop?search=${item}`}
                                  className="block px-4 py-2 text-[13px] font-semibold text-gray-500 hover:text-blue-600 transition-colors"
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
                </div>

                {/* Categories Section */}
                <div className="space-y-4">
                   <div className="flex items-center gap-2 pl-1">
                      <LayoutGrid className="w-4 h-4 text-blue-600" />
                      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shop Categories</h3>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      {parentCategories.slice(0, 6).map(cat => (
                        <Link 
                          key={cat.id} 
                          to={`/shop?category=${cat.slug}`}
                          className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50 transition-all text-center group"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="text-[11px] font-bold text-[#0A2342] uppercase group-hover:text-blue-600">{cat.name}</span>
                        </Link>
                      ))}
                      <Link 
                        to="/shop" 
                        onClick={() => setMobileOpen(false)}
                        className="flex flex-col items-center justify-center p-4 bg-blue-600 rounded-2xl text-center shadow-lg shadow-blue-200 group"
                      >
                        <span className="text-[11px] font-bold text-white uppercase">View All</span>
                      </Link>
                   </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col gap-5">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">Our Hotline</span>
                    <a href={`tel:${hotline}`} className="text-base font-black text-[#0A2342] hover:text-blue-600 transition-colors">{hotline}</a>
                  </div>
                </div>
                
                <div className="flex items-center justify-between px-2">
                   <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-bold text-gray-500 uppercase">Language</span>
                   </div>
                   <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
