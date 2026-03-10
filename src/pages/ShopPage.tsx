import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (categoryFilter && p.category !== categoryFilter) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [categoryFilter, search, priceRange]);

  const setCategory = (cat: string) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 lg:pt-24">
        {/* Header */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-2">Collection</p>
              <h1 className="heading-display text-4xl md:text-5xl font-bold">
                {categoryFilter
                  ? categories.find(c => c.id === categoryFilter)?.name || 'Shop'
                  : 'All Products'}
              </h1>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-border bg-background font-body text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-border font-body text-sm hover:border-gold transition-colors md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-56 shrink-0`}>
              <div className="sticky top-28 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-heading font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setCategory('')}
                      className={`block w-full text-left font-body text-sm py-1.5 transition-colors ${!categoryFilter ? 'text-gold font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      All Products
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`block w-full text-left font-body text-sm py-1.5 transition-colors ${categoryFilter === cat.id ? 'text-gold font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="font-heading font-semibold mb-4">Price Range</h3>
                  <div className="flex gap-3 items-center font-body text-sm">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-20 px-3 py-2 border border-border bg-background text-sm focus:outline-none focus:border-gold"
                      placeholder="Min"
                    />
                    <span className="text-muted-foreground">–</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-20 px-3 py-2 border border-border bg-background text-sm focus:outline-none focus:border-gold"
                      placeholder="Max"
                    />
                    <span className="text-muted-foreground">KWD</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <p className="font-body text-sm text-muted-foreground mb-6">{filtered.length} products</p>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-heading text-xl mb-2">No products found</p>
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
