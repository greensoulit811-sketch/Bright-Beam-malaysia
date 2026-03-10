import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { categories, brands } from '@/data/products';
import { useActiveProducts } from '@/hooks/useDatabase';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: dbProducts = [], isLoading } = useActiveProducts();
  const categoryFilter = searchParams.get('category') || '';
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const products = useMemo(() => {
    return dbProducts.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: Number(p.price),
      originalPrice: p.original_price ? Number(p.original_price) : undefined,
      category: p.category as any,
      image: p.image,
      images: p.images || [p.image],
      sizes: p.sizes || [],
      colors: p.colors || [],
      description: p.description || '',
      rating: Number(p.rating) || 4.5,
      reviews: p.reviews || 0,
      isTrending: p.is_trending || false,
      isNew: p.is_new || false,
    }));
  }, [dbProducts]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (categoryFilter && p.category !== categoryFilter) return false;
      if (brandFilter && p.brand !== brandFilter) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [products, categoryFilter, brandFilter, search, priceRange]);

  const setCategory = (cat: string) => {
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 lg:pt-24">
        <div className="bg-card border-b border-border py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-neon font-body text-sm font-bold tracking-[0.3em] uppercase">Collection</span>
              <h1 className="heading-display text-4xl md:text-6xl font-bold mt-2 text-foreground">
                {categoryFilter ? categories.find(c => c.id === categoryFilter)?.name || 'Shop' : 'All Products'}
              </h1>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search shoes, brands..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon transition-colors rounded-sm" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-border bg-background font-body text-sm text-foreground hover:border-neon transition-colors md:hidden rounded-sm">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>

          <div className="flex gap-8">
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-56 shrink-0`}>
              <div className="sticky top-28 space-y-8">
                <div>
                  <h3 className="font-heading font-bold uppercase tracking-wider text-sm mb-4 text-foreground">Categories</h3>
                  <div className="space-y-2">
                    <button onClick={() => setCategory('')}
                      className={`block w-full text-left font-body text-sm py-1.5 transition-colors ${!categoryFilter ? 'text-neon font-semibold' : 'text-muted-foreground hover:text-foreground'}`}>
                      All Products
                    </button>
                    {categories.map(cat => (
                      <button key={cat.id} onClick={() => setCategory(cat.id)}
                        className={`block w-full text-left font-body text-sm py-1.5 transition-colors ${categoryFilter === cat.id ? 'text-neon font-semibold' : 'text-muted-foreground hover:text-foreground'}`}>
                        {cat.emoji} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold uppercase tracking-wider text-sm mb-4 text-foreground">Brands</h3>
                  <div className="space-y-2">
                    <button onClick={() => setBrandFilter('')}
                      className={`block w-full text-left font-body text-sm py-1.5 transition-colors ${!brandFilter ? 'text-neon font-semibold' : 'text-muted-foreground hover:text-foreground'}`}>
                      All Brands
                    </button>
                    {brands.map(brand => (
                      <button key={brand} onClick={() => setBrandFilter(brand)}
                        className={`block w-full text-left font-body text-sm py-1.5 transition-colors ${brandFilter === brand ? 'text-neon font-semibold' : 'text-muted-foreground hover:text-foreground'}`}>
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold uppercase tracking-wider text-sm mb-4 text-foreground">Price (KWD)</h3>
                  <div className="flex gap-3 items-center font-body text-sm">
                    <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-20 px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-neon rounded-sm" placeholder="Min" />
                    <span className="text-muted-foreground">–</span>
                    <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-20 px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-neon rounded-sm" placeholder="Max" />
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <p className="font-body text-sm text-muted-foreground mb-6">{filtered.length} products found</p>
              {isLoading ? (
                <div className="text-center py-20">
                  <p className="font-body text-muted-foreground">Loading products...</p>
                </div>
              ) : filtered.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {filtered.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-heading text-2xl uppercase font-bold mb-2 text-foreground">No Results</p>
                  <p className="font-body text-sm text-muted-foreground">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
