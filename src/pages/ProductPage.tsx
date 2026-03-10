import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, Heart, Minus, Plus, ArrowLeft, Truck, RefreshCw, Shield } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="heading-display text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-gold font-body text-sm underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return; }
    if (!selectedColor) { toast.error('Please select a color'); return; }
    addToCart(product, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-body text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-secondary overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="heading-display text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-border'}`} />
                  ))}
                </div>
                <span className="font-body text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="font-heading text-3xl font-bold">{product.price} KWD</span>
                {product.originalPrice && (
                  <span className="font-body text-lg text-muted-foreground line-through">{product.originalPrice} KWD</span>
                )}
              </div>

              <p className="font-body text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {/* Size */}
              <div className="mb-6">
                <h3 className="font-heading font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border font-body text-sm transition-colors ${selectedSize === size ? 'border-gold bg-gold text-accent-foreground' : 'border-border hover:border-foreground'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-8">
                <h3 className="font-heading font-semibold mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border font-body text-sm transition-colors ${selectedColor === color ? 'border-gold bg-gold text-accent-foreground' : 'border-border hover:border-foreground'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Actions */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-border">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-12 flex items-center justify-center hover:bg-secondary transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center font-body text-sm font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-12 flex items-center justify-center hover:bg-secondary transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold transition-colors duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 border flex items-center justify-center transition-colors ${wishlisted ? 'border-gold' : 'border-border hover:border-foreground'}`}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-gold text-gold' : ''}`} />
                </button>
              </div>

              {/* Info */}
              <div className="space-y-3 border-t border-border pt-6">
                {[
                  { icon: Truck, text: 'Free delivery across Kuwait on orders over 30 KWD' },
                  { icon: RefreshCw, text: '30-day easy return policy' },
                  { icon: Shield, text: 'Cash on Delivery available' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                    <item.icon className="w-4 h-4 text-gold shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-20 pt-10 border-t border-border">
              <h2 className="heading-display text-2xl md:text-3xl font-bold mb-10">You May Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
