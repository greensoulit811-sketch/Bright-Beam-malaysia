import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Star, Heart, Minus, Plus, Truck, RefreshCw, Shield, Zap } from 'lucide-react';
import { useActiveProducts } from '@/hooks/useDatabase';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ProductPage = () => {
  const { id } = useParams();
  const { data: dbProducts = [], isLoading } = useActiveProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const allProducts = useMemo(() => dbProducts.map(p => ({
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
  })), [dbProducts]);

  const product = allProducts.find(p => p.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <p className="font-body text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="heading-display text-3xl font-bold mb-4 text-foreground">Product Not Found</h1>
          <Link to="/shop" className="text-neon font-body text-sm underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return; }
    if (!selectedColor) { toast.error('Please select a color'); return; }
    addToCart(product, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex items-center gap-2 font-body text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link><span>/</span>
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link><span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-square bg-card overflow-hidden rounded-lg border border-border">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <span className="font-body text-sm text-neon font-bold tracking-wider uppercase">{product.brand}</span>
              <h1 className="heading-display text-3xl md:text-5xl font-bold mt-1 mb-4 text-foreground">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-neon text-neon' : 'text-border'}`} />
                  ))}
                </div>
                <span className="font-body text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="font-heading text-4xl font-bold text-neon">{product.price} KWD</span>
                {product.originalPrice && (
                  <>
                    <span className="font-body text-lg text-muted-foreground line-through">{product.originalPrice} KWD</span>
                    <span className="bg-destructive text-destructive-foreground px-2 py-1 text-xs font-body font-bold tracking-wider uppercase rounded-sm">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="font-body text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              <div className="mb-6">
                <h3 className="font-heading font-bold uppercase tracking-wider text-sm mb-3 text-foreground">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border font-body text-sm font-semibold rounded-sm transition-all ${selectedSize === size ? 'border-neon bg-neon text-accent-foreground glow-neon' : 'border-border text-foreground hover:border-neon/50'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-heading font-bold uppercase tracking-wider text-sm mb-3 text-foreground">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button key={color} onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border font-body text-sm font-medium rounded-sm transition-all ${selectedColor === color ? 'border-neon bg-neon text-accent-foreground' : 'border-border text-foreground hover:border-neon/50'}`}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-border rounded-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-12 flex items-center justify-center hover:bg-card transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 h-12 flex items-center justify-center font-body text-sm font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-12 flex items-center justify-center hover:bg-card transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={handleAddToCart}
                  className="flex-1 h-12 bg-neon text-accent-foreground font-body text-sm font-bold tracking-wider uppercase hover:bg-neon-glow transition-all duration-300 glow-neon rounded-sm">
                  Add to Cart
                </button>
                <button onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 border flex items-center justify-center rounded-sm transition-all ${wishlisted ? 'border-neon bg-neon/10' : 'border-border hover:border-neon/50'}`}>
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-neon text-neon' : 'text-foreground'}`} />
                </button>
              </div>

              <div className="space-y-3 border-t border-border pt-6">
                {[
                  { icon: Shield, text: '100% Authentic - Verified by SRK Collection' },
                  { icon: Truck, text: 'Free delivery across Kuwait on orders over 30 KWD' },
                  { icon: RefreshCw, text: '30-day easy return policy' },
                  { icon: Zap, text: 'Cash on Delivery available' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                    <item.icon className="w-4 h-4 text-neon shrink-0" />{item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {related.length > 0 && (
            <section className="mt-20 pt-10 border-t border-border">
              <h2 className="heading-display text-2xl md:text-4xl font-bold mb-10 text-foreground">You May Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
