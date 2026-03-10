import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Truck, RefreshCw, CheckCircle } from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-shoes.jpg';
import menImage from '@/assets/product-mens-formal.jpg';
import womenImage from '@/assets/product-womens.jpg';
import sportsImage from '@/assets/product-sports.jpg';
import casualImage from '@/assets/product-casual.jpg';
import { useState } from 'react';

const categoryImages: Record<string, string> = {
  men: menImage,
  women: womenImage,
  sports: sportsImage,
  casual: casualImage,
  formal: menImage,
};

const reviews = [
  { name: 'Ahmed K.', text: 'The quality is exceptional. Best shoes I have bought in Kuwait!', rating: 5 },
  { name: 'Sara M.', text: 'Beautiful design and very comfortable. Fast delivery too.', rating: 5 },
  { name: 'Omar H.', text: 'Premium quality at a fair price. Highly recommend LUXESTEP.', rating: 4 },
];

const Index = () => {
  const trendingProducts = products.filter(p => p.isTrending);
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Premium luxury shoes" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">Premium Collection 2026</p>
            <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-[0.95]">
              Step Into<br /><span className="italic">Style</span>
            </h1>
            <p className="text-primary-foreground/80 font-body text-lg md:text-xl mb-8 max-w-lg">
              Premium Quality Shoes for Men & Women in Kuwait
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-gold text-accent-foreground px-8 py-4 font-body text-sm font-semibold tracking-widest uppercase hover:bg-gold-dark transition-colors duration-300"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop?category=women"
                className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 font-body text-sm font-semibold tracking-widest uppercase hover:bg-primary-foreground/10 transition-colors duration-300"
              >
                Women's Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3">Browse</p>
            <h2 className="heading-display text-3xl md:text-5xl font-bold">Featured Categories</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="block group relative aspect-[3/4] overflow-hidden"
                >
                  <img
                    src={categoryImages[cat.id]}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/60 transition-colors duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground">
                    <h3 className="font-heading text-lg md:text-xl font-semibold mb-1">{cat.name}</h3>
                    <p className="font-body text-xs text-primary-foreground/70">{cat.count} Products</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3">Curated</p>
              <h2 className="heading-display text-3xl md:text-5xl font-bold">Trending Now</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 font-body text-sm tracking-wider uppercase hover-gold transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 font-body text-sm tracking-wider uppercase hover-gold transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3">Why Us</p>
            <h2 className="heading-display text-3xl md:text-5xl font-bold">Why Choose LUXESTEP</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Premium Quality', desc: 'Only the finest materials and craftsmanship' },
              { icon: CheckCircle, title: 'Comfortable Design', desc: 'Engineered for all-day comfort' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Express delivery across Kuwait' },
              { icon: RefreshCw, title: 'Easy Returns', desc: 'Hassle-free 30-day return policy' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 mx-auto mb-5 border border-gold rounded-full flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3">Testimonials</p>
            <h2 className="heading-display text-3xl md:text-5xl font-bold">Customer Reviews</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-8 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">"{review.text}"</p>
                <p className="font-heading font-semibold text-sm">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3">Stay Updated</p>
            <h2 className="heading-display text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="font-body text-muted-foreground mb-8">Get exclusive offers, new arrivals and style tips delivered to your inbox.</p>
            <form onSubmit={(e) => { e.preventDefault(); setEmail(''); }} className="flex gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 border border-border bg-background font-body text-sm focus:outline-none focus:border-gold transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-4 font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
