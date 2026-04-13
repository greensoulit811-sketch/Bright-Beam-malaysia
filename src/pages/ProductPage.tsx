import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { Star, Heart, Minus, Plus, Truck, RefreshCw, Shield, Zap, MessageCircle } from 'lucide-react';
import { useActiveProducts } from '@/hooks/useDatabase';
import { useProductVariations } from '@/hooks/useProductVariations';
import { useCart } from '@/context/CartContext';
import { useFacebookTracking } from '@/hooks/useFacebookTracking';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductReviews from '@/components/ProductReviews';
import FakePurchaseNotification from '@/components/FakePurchaseNotification';
import CountdownTimer from '@/components/CountdownTimer';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ProductPage = () => {
  const { id } = useParams();
  const { data: dbProducts = [], isLoading } = useActiveProducts();
  const { data: variations = [] } = useProductVariations(id || '');
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { fbTrackViewContent, fbTrackAddToCart } = useFacebookTracking();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const allProducts = useMemo(() => dbProducts.map(p => ({
    id: p.id, name: p.name, brand: p.brand, price: Number(p.price),
    originalPrice: p.original_price ? Number(p.original_price) : undefined,
    category: p.category as any, image: p.image,
    images: p.images || [p.image], sizes: p.sizes || [], colors: p.colors || [],
    description: p.description || '', rating: Number(p.rating) || 4.5,
    reviews: p.reviews || 0, isTrending: p.is_trending || false, isNew: p.is_new || false,
  })), [dbProducts]);

  const product = allProducts.find(p => p.id === id);

  // Auto-select when only one size or color option
  useEffect(() => {
    if (product) {
      if (product.sizes.length === 1) setSelectedSize(product.sizes[0]);
      if (product.colors.length === 1) setSelectedColor(product.colors[0]);
    }
  }, [product?.id]);

  const selectedVariation = useMemo(() => {
    if (!selectedSize || !selectedColor || variations.length === 0) return null;
    return variations.find(v => v.size === String(selectedSize) && v.color === selectedColor) || null;
  }, [selectedSize, selectedColor, variations]);

  const displayPrice = selectedVariation?.price ? Number(selectedVariation.price) : product?.price || 0;
  const variationStock = selectedVariation ? selectedVariation.stock : null;

  useEffect(() => {
    if (product) {
      fbTrackViewContent({
        content_ids: [product.id], content_name: product.name,
        content_category: product.category, value: product.price,
      });
    }
  }, [product?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center"><p className="font-body text-muted-foreground">{t('loading')}</p></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="heading-display text-3xl font-bold mb-4 text-foreground">{t('product.not_found')}</h1>
          <Link to="/shop" className="text-neon font-body text-sm underline">{t('product.back_to_shop')}</Link>
        </div>
      </div>
    );
  }

  const galleryImages = product.images.length > 0 ? product.images : [product.image];
  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isInWishlist(product.id);
  const productNames = allProducts.map(p => p.name);

  const validateSelection = () => {
    if (!selectedSize) { toast.error(t('product.select_size_error')); return false; }
    if (!selectedColor) { toast.error(t('product.select_color_error')); return false; }
    if (variationStock !== null && variationStock <= 0) { toast.error(t('product.out_of_stock_error')); return false; }
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection()) return;
    const cartProduct = { ...product, price: displayPrice };
    addToCart(cartProduct, selectedSize, selectedColor);
    fbTrackAddToCart({
      content_ids: [product.id], content_name: product.name,
      value: displayPrice * quantity, num_items: quantity,
    });
    toast.success(`${product.name} ${t('product.added_to_cart')}`);
  };

  const handleBuyNow = () => {
    if (!validateSelection()) return;
    const cartProduct = { ...product, price: displayPrice };
    addToCart(cartProduct, selectedSize, selectedColor);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex items-center gap-2 font-body text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">{t('nav.home')}</Link><span>/</span>
            <Link to="/shop" className="hover:text-foreground transition-colors">{t('nav.shop')}</Link><span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="aspect-square bg-card overflow-hidden rounded-lg border border-border mb-4">
                <img src={galleryImages[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              </motion.div>
              {galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {galleryImages.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <span className="font-body text-sm text-neon font-bold tracking-wider uppercase">{product.brand}</span>
              <h1 className="heading-display text-3xl md:text-5xl font-bold mt-1 mb-4 text-foreground">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-neon text-neon' : 'text-border'}`} />
                  ))}
                </div>
                <span className="font-body text-sm text-muted-foreground">({product.reviews.toLocaleString()} {t('product.reviews')})</span>
              </div>

              <CountdownTimer />

              <div className="flex items-center gap-3 mb-8">
                <span className="font-heading text-4xl font-bold text-neon">{displayPrice} KWD</span>
                {product.originalPrice && (
                  <>
                    <span className="font-body text-lg text-muted-foreground line-through">{product.originalPrice} KWD</span>
                    <span className="bg-destructive text-destructive-foreground px-2 py-1 text-xs font-body font-bold tracking-wider uppercase rounded-sm">
                      {Math.round((1 - displayPrice / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {variationStock !== null && (
                <p className={`font-body text-sm mb-4 ${variationStock > 0 ? 'text-green-600' : 'text-destructive'}`}>
                  {variationStock > 0 ? `${variationStock} ${t('product.in_stock')}` : t('product.out_of_stock')}
                </p>
              )}

              <p className="font-body text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              <div className="mb-6">
                <h3 className="font-heading font-bold uppercase tracking-wider text-sm mb-3 text-foreground">{t('product.select_size')}</h3>
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
                <h3 className="font-heading font-bold uppercase tracking-wider text-sm mb-3 text-foreground">{t('product.color')}</h3>
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
                  disabled={variationStock !== null && variationStock <= 0}
                  className="flex-1 h-12 bg-neon text-accent-foreground font-body text-sm font-bold tracking-wider uppercase hover:bg-neon-glow transition-all duration-300 glow-neon rounded-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {variationStock !== null && variationStock <= 0 ? t('product.out_of_stock') : t('product.add_to_cart')}
                </button>
                <button onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 border flex items-center justify-center rounded-sm transition-all ${wishlisted ? 'border-neon bg-neon/10' : 'border-border hover:border-neon/50'}`}>
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-neon text-neon' : 'text-foreground'}`} />
                </button>
              </div>

              <button onClick={handleBuyNow}
                disabled={variationStock !== null && variationStock <= 0}
                className="w-full h-12 bg-foreground text-background font-body text-sm font-bold tracking-wider uppercase hover:bg-foreground/90 transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed mb-3">
                {t('product.buy_now')}
              </button>

              <a
                href={`https://wa.me/96590993896?text=${encodeURIComponent(`Hi! I'd like to order:\n\nProduct: ${product.name}\nBrand: ${product.brand}\nSize: ${selectedSize || 'Not selected'}\nColor: ${selectedColor || 'Not selected'}\nQuantity: ${quantity}\nPrice: ${displayPrice} KWD\n\nPlease confirm my order. Thank you!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-[#25D366] text-white font-body text-sm font-bold tracking-wider uppercase hover:bg-[#20bd5a] transition-all duration-300 rounded-sm flex items-center justify-center gap-2 mb-8"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </a>

              <div className="space-y-3 border-t border-border pt-6">
                {[
                  { icon: Shield, text: t('product.authentic') },
                  { icon: Truck, text: t('product.free_delivery') },
                  { icon: RefreshCw, text: t('product.return_policy') },
                  { icon: Zap, text: t('product.cod') },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                    <item.icon className="w-4 h-4 text-neon shrink-0" />{item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <ProductReviews productId={product.id} />

          {related.length > 0 && (
            <section className="mt-20 pt-10 border-t border-border">
              <h2 className="heading-display text-2xl md:text-4xl font-bold mb-10 text-foreground">{t('product.related')}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}
        </div>
      </div>
      <FakePurchaseNotification productNames={productNames} />
      <Footer />
    </div>
  );
};

export default ProductPage;
