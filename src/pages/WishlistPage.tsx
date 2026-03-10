import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WishlistPage = () => {
  const { wishlist } = useCart();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-8 py-10">
          <h1 className="heading-display text-3xl md:text-4xl font-bold mb-10">Wishlist</h1>
          {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
              <h2 className="heading-display text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
              <p className="font-body text-muted-foreground mb-8">Save your favorite items here</p>
              <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold transition-colors">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;
