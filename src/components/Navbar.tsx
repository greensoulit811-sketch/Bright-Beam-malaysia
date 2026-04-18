import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ChevronRight, Phone, Globe, LayoutGrid, Home, Package, Info, Mail } from 'lucide-react';
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
    { title: 'DIY PC Packages', dropdown: true, items: diySubCategories, icon: LayoutGrid },
    { title: 'Commercial', dropdown: false, icon: Home },
    { title: 'Become A Dealer', dropdown: false, icon: Package },
    { title: 'Pricelist', dropdown: false, icon: Info },
    { title: 'Quotation', dropdown: false, icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm">
      {/* Desktop Header (lg and above) */}
      <div className="hidden lg:block border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center h-20">
            {/* Logo Side */}
            <div className="flex-shrink-0 w-48">
              <Link to="/" className="flex items-center">
                <img src="/logos.png" alt="Bright Beam" className="h-12 w-auto" />
              </Link>
            </div>

            {/* Main Links - Centered */}
            <div className="flex-1 flex justify-center h-full">
              <div className="flex items-center gap-6 xl:gap-8 h-full">
                {navLinks.map((link) => (
                  <div 
                    key={link.title} 
                    className="relative h-20 flex items-center group cursor-pointer"
                    onMouseEnter={() => setHoveredLink(link.title)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <div className={`flex items-center gap-1.5 text-[11px] xl:text-[13px] font-bold uppercase tracking-tight text-gray-700 transition-colors group-hover:text-blue-600 ${hoveredLink === link.title ? 'text-blue-600' : ''}`}>
                      {link.title}
                      {link.dropdown && <ChevronRight className={`w-3.5 h-3.5 rotate-90 transition-transform ${hoveredLink === link.title ? 'rotate-[270deg]' : ''}`} />}
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transition-transform duration-300 ${hoveredLink === link.title ? 'scale-x-100' : 'scale-x-0'}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Hotline & Language */}
            <div className="flex-shrink-0 flex items-center gap-8">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Hotline:</span>
                <a href={`tel:${hotline}`} className="text-[16px] xl:text-[18px] font-black text-[#0A2342]">{hotline}</a>
              </div>
              <div className="border-l pl-4 border-gray-100">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Bottom Row */}
      <div className="hidden lg:block bg-[#0A2342] text-white">
        <div className="container mx-auto px-4 lg:px-8 flex items-center h-16 gap-12">
          <div className="relative h-full flex items-center" ref={dropdownRef}>
            <button className="flex items-center gap-2 text-white font-bold uppercase text-[12px] hover:text-blue-400 transition-colors" onClick={() => setCatMenuOpen(!catMenuOpen)}>
              <Menu className="w-5 h-5" /> All Categories <ChevronRight className={`w-3 h-3 rotate-90 transition-transform ${catMenuOpen ? 'rotate-[270deg]' : ''}`} />
            </button>
          </div>
          <div className="flex-1 flex justify-center h-full items-center">
            <form onSubmit={handleSearch} className="w-full max-w-2xl flex h-10">
              <input type="text" placeholder="Search..." className="w-full bg-white rounded-l-full px-6 text-sm text-gray-800 focus:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button type="submit" className="w-14 bg-[#5BC0DE] text-white rounded-r-full hover:bg-[#46b8da] transition-colors"><Search className="w-5 h-5 mx-auto" /></button>
            </form>
          </div>
          <Link to="/cart" className="flex items-center gap-3 shrink-0">
             <div className="relative"><ShoppingBag className="w-7 h-7 text-white" />{cartCount > 0 && <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-[#0A2342] rounded-full text-[11px] flex items-center justify-center font-bold border-2 border-[#0A2342]">{cartCount}</span>}</div>
             <span className="text-[16px] font-black uppercase tracking-tighter">RM {cartTotal.toFixed(2)}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Header (Sleek, Balanced) */}
      <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100">
        <button 
          className="w-10 h-10 flex items-center justify-center text-[#0A2342] bg-gray-50 rounded-full active:scale-95 transition-all"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link to="/" className="flex items-center justify-center flex-1">
          <img src="/logos.png" alt="Logo" className="h-7 w-auto" />
        </Link>

        <Link to="/cart" className="relative w-10 h-10 flex items-center justify-center text-[#0A2342] bg-gray-50 rounded-full active:scale-95 transition-all">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-white">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Premium Mobile Side Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#0A2342]/20 backdrop-blur-md z-[200] lg:hidden"
            />
            
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[210] lg:hidden flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Drawer Brand Header */}
              <div className="p-6 bg-[#0A2342] text-white">
                 <div className="flex items-center justify-between mb-8">
                    <img src="/logos.png" alt="Logo" className="h-8 brightness-0 invert" />
                    <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white">
                       <X className="w-5 h-5" />
                    </button>
                 </div>
                 <div className="space-y-1">
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Get in touch</p>
                    <a href={`tel:${hotline}`} className="text-xl font-bold block">{hotline}</a>
                 </div>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto bg-white">
                
                {/* Search Bar - Stick to top of scroll */}
                <div className="p-5 border-b border-gray-50 bg-gray-50/50">
                  <form onSubmit={handleSearch} className="relative flex">
                    <input 
                      type="text" 
                      placeholder="Search for laptops, PCs..." 
                      className="w-full bg-white py-3 pl-4 pr-12 rounded-xl text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#0A2342] text-white rounded-lg">
                      <Search className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* Main Navigation with Icons */}
                <div className="p-5 space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Explore</p>
                  {navLinks.map((link) => (
                    <div key={link.title} className="space-y-1">
                      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <link.icon className="w-5 h-5" />
                        </div>
                        {link.dropdown ? (
                          <span className="flex-1 font-bold text-sm text-gray-700 uppercase">{link.title}</span>
                        ) : (
                          <Link to="/shop" onClick={() => setMobileOpen(false)} className="flex-1 font-bold text-sm text-gray-700 uppercase">{link.title}</Link>
                        )}
                        {link.dropdown && <ChevronRight className="w-4 h-4 text-gray-300" />}
                      </div>
                      
                      {link.dropdown && (
                        <div className="ml-14 grid grid-cols-1 gap-1 pb-4">
                          {link.items && link.items.length > 0 ? link.items.map((item) => (
                            <Link key={item.id} to={`/shop?category=${item.slug}`} className="py-2 text-[13px] font-semibold text-gray-500 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
                              • {item.name}
                            </Link>
                          )) : (
                            ['Gaming PCs', 'Laptops', 'Components'].map(item => (
                              <Link key={item} to="/shop" className="py-2 text-[13px] font-semibold text-gray-500 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
                                • {item}
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Categories Grid Section */}
                <div className="p-5 border-t border-gray-50 space-y-4">
                  <div className="flex items-center justify-between ml-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shop Categories</p>
                    <Link to="/shop" onClick={() => setMobileOpen(false)} className="text-[10px] font-bold text-blue-600 uppercase">View All</Link>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {parentCategories.slice(0, 4).map(cat => (
                      <Link 
                        key={cat.id} 
                        to={`/shop?category=${cat.slug}`}
                        className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="text-[11px] font-bold text-gray-700 uppercase">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer App-style Footer */}
              <div className="p-5 bg-white border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                       <Globe className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Language</span>
                 </div>
                 <LanguageSwitcher />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
