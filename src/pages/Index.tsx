import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Truck, RefreshCw, Shield, ChevronRight } from 'lucide-react';
import { products, categories, brands } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-sports.jpg';
import basketballImg from '@/assets/shoe-basketball.jpg';
import runnerImg from '@/assets/shoe-runner-1.jpg';
import footballImg from '@/assets/shoe-football.jpg';
import trainingImg from '@/assets/shoe-training.jpg';
import lifestyleImg from '@/assets/shoe-lifestyle.jpg';
import trailImg from '@/assets/shoe-trail.jpg';
import womensImg from '@/assets/shoe-womens-run.jpg';
import { useState } from 'react';

const categoryImages: Record<string, string> = {
  running: runnerImg,
  basketball: basketballImg,
  football: footballImg,
  training: trainingImg,
  lifestyle: lifestyleImg,
  trail: trailImg,
  women: womensImg,
};

const reviews = [
  { name: 'Khalid A.', text: 'Authentic products, fast shipping. Best sneaker store in Kuwait!', rating: 5 },
  { name: 'Fatima R.', text: 'Got my Air Jordans in 2 days. Perfect condition, 100% legit.', rating: 5 },
  { name: 'Mohammed S.', text: 'Great selection of brands. The Ultraboost are incredibly comfortable.', rating: 5 },
];

const Index = () => {
  const trendingProducts = products.filter(p => p.isTrending);
  const newProducts = products.filter(p => p.isNew);
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Athletic running shoes in action" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-neon/10 border border-neon/30 px-4 py-2 mb-6"
            >
              <Zap className="w-4 h-4 text-neon" />
              <span className="text-neon font-body text-sm font-semibold tracking-wider uppercase">New Arrivals 2026</span>
            </motion.div>
            <h1 className="heading-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-6">
              FUEL YOUR<br />
              <span className="text-neon text-glow">GAME</span>
            </h1>
            <p className="text-muted-foreground font-body text-lg md:text-xl mb-8 max-w-lg">
              Authentic Nike, Adidas, Puma & more. Delivered to your door in Kuwait.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-neon text-accent-foreground px-8 py-4 font-body text-sm font-bold tracking-widest uppercase hover:bg-neon-glow transition-all duration-300 glow-neon"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop?category=running"
                className="inline-flex items-center gap-2 border border-foreground/30 text-foreground px-8 py-4 font-body text-sm font-bold tracking-widest uppercase hover:border-neon hover:text-neon transition-all duration-300"
              >
                Running Collection
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-neon rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Brand Ticker */}
      <section className="py-6 border-y border-border bg-card overflow-hidden">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span key={i} className="font-heading text-2xl font-bold text-muted-foreground/30 uppercase tracking-wider">{brand}</span>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-neon font-body text-sm font-bold tracking-[0.3em] uppercase">Browse</span>
              <h2 className="heading-display text-4xl md:text-6xl font-bold mt-2">Shop by Sport</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 font-body text-sm font-semibold tracking-wider uppercase hover-neon transition-colors">
              All Categories <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.slice(0, 4).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="block group relative aspect-[4/5] overflow-hidden"
                >
                  <img
                    src={categoryImages[cat.id]}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute inset-0 border border-neon/0 group-hover:border-neon/50 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-3xl mb-1">{cat.emoji}</p>
                    <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide">{cat.name}</h3>
                    <p className="font-body text-xs text-muted-foreground mt-1">{cat.count} Products</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {categories.slice(4).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="block group relative aspect-[16/9] overflow-hidden"
                >
                  <img
                    src={categoryImages[cat.id]}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute inset-0 border border-neon/0 group-hover:border-neon/50 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-2xl mb-1">{cat.emoji}</p>
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide">{cat.name}</h3>
                    <p className="font-body text-xs text-muted-foreground">{cat.count} Products</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-neon font-body text-sm font-bold tracking-[0.3em] uppercase">Hot Right Now</span>
              <h2 className="heading-display text-4xl md:text-6xl font-bold mt-2">Trending</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 font-body text-sm font-semibold tracking-wider uppercase hover-neon transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {trendingProducts.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-background to-electric/5" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-neon font-body text-sm font-bold tracking-[0.3em] uppercase">Just Dropped</span>
              <h2 className="heading-display text-4xl md:text-6xl font-bold mt-2">New Arrivals</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-neon font-body text-sm font-bold tracking-[0.3em] uppercase">The KICKZONE Difference</span>
            <h2 className="heading-display text-4xl md:text-6xl font-bold mt-2">Why Athletes Choose Us</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: '100% Authentic', desc: 'Every pair verified genuine. We source directly from brands.' },
              { icon: Zap, title: 'Performance Gear', desc: 'Latest tech from Nike, Adidas, Puma & top sport brands.' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Express delivery across Kuwait. Same-day in Kuwait City.' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free returns. No questions asked.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-secondary/50 border border-border hover:border-neon/30 transition-colors duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-5 bg-neon/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-neon" />
                </div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-neon font-body text-sm font-bold tracking-[0.3em] uppercase">Reviews</span>
            <h2 className="heading-display text-4xl md:text-6xl font-bold mt-2">What Athletes Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 border border-border hover:border-neon/20 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-neon text-neon" />
                  ))}
                </div>
                <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">"{review.text}"</p>
                <p className="font-heading font-bold text-sm uppercase tracking-wider">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon/5 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <span className="text-neon font-body text-sm font-bold tracking-[0.3em] uppercase">Stay In The Game</span>
            <h2 className="heading-display text-3xl md:text-5xl font-bold mt-2 mb-4">Get Exclusive Drops</h2>
            <p className="font-body text-muted-foreground mb-8">Early access to new releases, exclusive deals, and athlete updates.</p>
            <form onSubmit={(e) => { e.preventDefault(); setEmail(''); }} className="flex gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 border border-border bg-background font-body text-sm focus:outline-none focus:border-neon transition-colors text-foreground placeholder:text-muted-foreground"
                required
              />
              <button
                type="submit"
                className="bg-neon text-accent-foreground px-8 py-4 font-body text-sm font-bold tracking-wider uppercase hover:bg-neon-glow transition-colors duration-300"
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
