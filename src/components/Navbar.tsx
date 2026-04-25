import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ChevronDown, Phone, Globe, LayoutGrid, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useActiveCategories } from '@/hooks/useCategories';
import { useActiveProducts } from '@/hooks/useDatabase';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount, cartTotal } = useCart();
  const { data: categories = [] } = useActiveCategories();
  const { data: products = [] } = useActiveProducts();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredCatId, setHoveredCatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileTab, setMobileTab] = useState<'menu' | 'categories'>('menu');
  const [expandedLinks, setExpandedLinks] = useState<string[]>([]);
  const [expandedCats, setExpandedCats] = useState<string[]>([]);
  const [showAllCats, setShowAllCats] = useState(false);
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

  const toggleExpanded = (title: string) => {
    setExpandedLinks(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };

  const toggleCatExpanded = (id: string) => {
    setExpandedCats(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const parentCategories = useMemo(() => categories.filter(c => !c.parent_id), [categories]);
  const diySubCategories = categories.filter(c => c.parent_id !== null).slice(0, 8); 
  const hotline = "+60 19-322 2058"; 
  
  // Get brands for each category
  const categoryBrandsMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    
    parentCategories.forEach(parent => {
      const children = categories.filter(c => c.parent_id === parent.id);
      const childSlugs = [parent.slug, ...children.map(c => c.slug)];
      
      const brands = new Set<string>();
      products.forEach(p => {
        if (childSlugs.includes(p.category)) {
          if (p.brand) brands.add(p.brand);
        }
      });
      map[parent.id] = Array.from(brands).sort();
    });
    
    return map;
  }, [categories, parentCategories, products]);

  const navLinks = [
    { title: 'DIY PC Packages', dropdown: true, items: diySubCategories, path: '/' },
    { title: 'Shop', dropdown: false, path: '/shop' },
    { title: 'Pricelist', dropdown: false, path: '/pricelist' },
    { title: 'Quotation', dropdown: false, path: '/quotation' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm lg:shadow-none">
      {/* Desktop Top Row */}
      <div className="hidden lg:block border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 w-48">
              <Link to="/"><img src="/logos.png" alt="Bright Beam" className="h-12 w-auto" /></Link>
            </div>
            {/* Nav Links */}
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
                      <Link to={link.path || '#'}>{link.title}</Link>
                      {link.dropdown && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${hoveredLink === link.title ? 'rotate-180' : ''}`} />}
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transition-transform duration-300 ${hoveredLink === link.title ? 'scale-x-100' : 'scale-x-0'}`} />
                    
                    {/* Desktop Mega Menu Dropdown */}
                    <AnimatePresence>
                      {link.dropdown && hoveredLink === link.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white shadow-xl border border-gray-100 py-3 z-[110]"
                        >
                          {link.items && link.items.length > 0 ? link.items.map((item) => (
                            <Link key={item.id} to={`/shop?category=${item.slug}`} className="block px-6 py-2.5 text-[12px] font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors uppercase" onClick={() => setHoveredLink(null)}>
                              {item.name}
                            </Link>
                          )) : (
                            ['Gaming PCs', 'Laptops', 'Components'].map(item => (
                              <Link key={item} to="/shop" className="block px-6 py-2.5 text-[12px] font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors uppercase" onClick={() => setHoveredLink(null)}>{item}</Link>
                            ))
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            {/* Hotline */}
            <div className="flex-shrink-0 flex items-center gap-8">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Hotline:</span>
                <a href={`tel:${hotline}`} className="text-[16px] xl:text-[18px] font-black text-[#0A2342]">{hotline}</a>
              </div>
              <div className="border-l pl-4 border-gray-100"><LanguageSwitcher /></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop Bottom Row */}
      <div className="hidden lg:block bg-[#0A2342] text-white">
        <div className="container mx-auto px-4 lg:px-8 flex items-center h-16 gap-12">
          <div className="relative h-full flex items-center" ref={dropdownRef}>
            <button className="flex items-center gap-2 text-white font-bold uppercase text-[12px] hover:text-blue-400 transition-colors" onClick={() => setCatMenuOpen(!catMenuOpen)}>
              <Menu className="w-5 h-5" /> All Categories <ChevronDown className={`w-3 h-3 transition-transform ${catMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {catMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 0, width: 260 }} 
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    width: hoveredCatId ? 560 : 260 
                  }} 
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="absolute top-full left-0 z-[150] flex min-h-[450px]"
                  onMouseLeave={() => setHoveredCatId(null)}
                >
                  {/* Left Column: Categories List */}
                  <div className="w-[260px] bg-white shadow-lg border border-gray-200 py-2 relative h-fit max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {(showAllCats ? parentCategories : parentCategories.slice(0, 8)).map((cat, index) => (
                      <div 
                        key={cat.id}
                        className={`group flex items-center justify-between px-7 py-3 cursor-pointer transition-colors ${hoveredCatId === cat.id ? 'bg-[#f8f8f8] text-gray-900' : 'text-gray-700 hover:bg-[#f8f8f8]'}`}
                        onMouseEnter={() => setHoveredCatId(cat.id)}
                        onClick={() => {
                          navigate(`/shop?category=${cat.slug}`);
                          setCatMenuOpen(false);
                        }}
                      >
                        <span className="text-[15px] font-normal">{cat.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400" />
                      </div>
                    ))}
                    
                    {parentCategories.length > 8 && (
                      <div className="mt-2 px-7 py-3 border-t border-gray-50">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowAllCats(!showAllCats);
                          }}
                          className="text-[14px] text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-1"
                        >
                          {showAllCats ? '- Show Less' : `+ More Categories (${parentCategories.length - 8})`}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Flying-out Card */}
                  <AnimatePresence>
                    {hoveredCatId && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          y: (parentCategories.findIndex(c => c.id === hoveredCatId) * 48)
                        }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute left-[260px] w-[300px] bg-white shadow-xl border border-gray-100 py-8 px-10 z-[160]"
                        style={{ top: '8px' }}
                      >
                        <div className="flex flex-col">
                          <div className="mb-4">
                            <h4 className="text-[16px] font-bold text-[#333]">
                              {categories.find(c => c.id === hoveredCatId)?.name}
                            </h4>
                          </div>
                          
                          <div className="flex flex-col gap-y-2.5">
                            {/* Priority 1: Subcategories from DB */}
                            {categories.some(c => c.parent_id === hoveredCatId) ? (
                              categories.filter(c => c.parent_id === hoveredCatId).map(sub => (
                                <Link 
                                  key={sub.id} 
                                  to={`/shop?category=${sub.slug}`}
                                  className="text-[15px] text-[#555] hover:text-blue-600 transition-colors"
                                  onClick={() => setCatMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))
                            ) : (
                              /* Priority 2: Brands from Products */
                              categoryBrandsMap[hoveredCatId]?.map(brand => (
                                <Link 
                                  key={brand} 
                                  to={`/shop?category=${categories.find(c => c.id === hoveredCatId)?.slug}&brand=${encodeURIComponent(brand)}`}
                                  className="text-[15px] text-[#555] hover:text-blue-600 transition-colors"
                                  onClick={() => setCatMenuOpen(false)}
                                >
                                  {brand}
                                </Link>
                              ))
                            )}
                            
                            {/* Empty State */}
                            {!categories.some(c => c.parent_id === hoveredCatId) && (!categoryBrandsMap[hoveredCatId] || categoryBrandsMap[hoveredCatId].length === 0) && (
                              <p className="text-[13px] text-gray-400 italic">No items found.</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 flex justify-center h-full items-center">
            <form onSubmit={handleSearch} className="w-full max-w-2xl flex h-10">
              <input type="text" placeholder="Search..." className="w-full bg-white rounded-l-full px-6 text-sm text-gray-800 focus:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button type="submit" className="w-14 bg-[#5BC0DE] text-white rounded-r-full hover:bg-[#46b8da] transition-colors"><Search className="w-5 h-5 mx-auto" /></button>
            </form>
          </div>
          <Link to="/cart" className="flex items-center gap-3 shrink-0 group transition-colors">
             <div className="relative">
               <ShoppingBag className="w-7 h-7 text-white group-hover:text-blue-500 transition-colors" />
               {cartCount > 0 && (
                 <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-[#0A2342] rounded-full text-[11px] flex items-center justify-center font-bold border-2 border-[#0A2342] group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">
                   {cartCount}
                 </span>
               )}
             </div>
             <span className="text-[16px] font-black uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
               RM {cartTotal.toFixed(2)}
             </span>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100">
        <button className="p-2" onClick={() => setMobileOpen(true)}><Menu className="w-6 h-6 text-[#0A2342]" /></button>
        <Link to="/"><img src="/logos.png" alt="Logo" className="h-7 w-auto" /></Link>
        <Link to="/cart" className="relative p-2">
          <ShoppingBag className="w-6 h-6 text-[#0A2342]" />
          {cartCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold border-2 border-white">{cartCount}</span>}
        </Link>
      </div>

      {/* Tabbed Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] lg:hidden" />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white z-[210] lg:hidden flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                 <span className="text-sm font-bold uppercase text-gray-400 tracking-widest pl-2">Navigation</span>
                 <button onClick={() => setMobileOpen(false)} className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-red-500 transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex border-b border-gray-100 bg-gray-50/50">
                 <button onClick={() => setMobileTab('menu')} className={`flex-1 py-4 text-center font-bold text-[15px] transition-all relative ${mobileTab === 'menu' ? 'text-blue-600 bg-white' : 'text-gray-500'}`}>
                   Menu {mobileTab === 'menu' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                 </button>
                 <button onClick={() => setMobileTab('categories')} className={`flex-1 py-4 text-center font-bold text-[15px] transition-all relative ${mobileTab === 'categories' ? 'text-blue-600 bg-white' : 'text-gray-500'}`}>
                   Categories {mobileTab === 'categories' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {mobileTab === 'menu' ? (
                    <motion.div key="menu" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="divide-y divide-gray-50">
                       {navLinks.map((link) => (
                         <div key={link.title} className="flex flex-col">
                            <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors">
                               <Link to={link.path || '#'} onClick={() => setMobileOpen(false)} className="text-[14px] font-bold text-[#0A2342] flex-1">{link.title}</Link>
                               {link.dropdown && <button onClick={() => toggleExpanded(link.title)} className="p-1 px-3 border border-gray-100 rounded text-gray-400 hover:text-blue-600 transition-colors">{expandedLinks.includes(link.title) ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}</button>}
                            </div>
                            {link.dropdown && expandedLinks.includes(link.title) && (
                              <div className="bg-gray-50 divide-y divide-gray-100">
                                {link.items?.map(item => <Link key={item.id} to={`/shop?category=${item.slug}`} className="block p-4 pl-8 text-[13px] font-semibold text-gray-500 hover:text-blue-600" onClick={() => setMobileOpen(false)}>{item.name}</Link>)}
                              </div>
                            )}
                         </div>
                       ))}
                       <div className="p-4 bg-gray-50/30">
                          <form onSubmit={handleSearch} className="relative flex">
                            <input type="text" placeholder="Search..." className="w-full bg-white py-2.5 px-4 rounded-lg text-sm border border-gray-100 focus:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#5BC0DE] text-white rounded-md"><Search className="w-4 h-4" /></button>
                          </form>
                       </div>
                    </motion.div>
                  ) : (
                    <motion.div key="cat" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="divide-y divide-gray-50">
                       {parentCategories.map(cat => {
                         const brands = categoryBrandsMap[cat.id] || [];
                         const subCats = categories.filter(c => c.parent_id === cat.id);
                         const hasItems = brands.length > 0 || subCats.length > 0;
                         
                         return (
                           <div key={cat.id} className="flex flex-col">
                             <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors">
                               <Link to={`/shop?category=${cat.slug}`} onClick={() => setMobileOpen(false)} className="text-[14px] font-bold text-[#0A2342] flex-1 uppercase">{cat.name}</Link>
                               {hasItems && (
                                 <button onClick={() => toggleCatExpanded(cat.id)} className="p-1 px-3 border border-gray-100 rounded text-gray-400">
                                   {expandedCats.includes(cat.id) ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                 </button>
                               )}
                             </div>
                             {hasItems && expandedCats.includes(cat.id) && (
                               <div className="bg-gray-50 divide-y divide-gray-100">
                                 {brands.length > 0 ? brands.map(brand => (
                                   <Link key={brand} to={`/shop?category=${cat.slug}&brand=${encodeURIComponent(brand)}`} className="block p-4 pl-8 text-[13px] font-semibold text-gray-500 hover:text-blue-600" onClick={() => setMobileOpen(false)}>{brand}</Link>
                                 )) : subCats.map(sub => (
                                   <Link key={sub.id} to={`/shop?category=${sub.slug}`} className="block p-4 pl-8 text-[13px] font-semibold text-gray-500 hover:text-blue-600" onClick={() => setMobileOpen(false)}>{sub.name}</Link>
                                 ))}
                               </div>
                             )}
                           </div>
                         );
                       })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-100 text-blue-600"><Phone className="w-5 h-5" /></div>
                    <div className="flex flex-col"><span className="text-[10px] font-bold text-gray-400 uppercase leading-none">Support</span><a href={`tel:${hotline}`} className="text-sm font-black text-[#0A2342]">{hotline}</a></div>
                 </div>
                 <div className="flex items-center justify-between px-1"><div className="flex items-center gap-2 text-gray-400"><Globe className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase">Language</span></div><LanguageSwitcher /></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
