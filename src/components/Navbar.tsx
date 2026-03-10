import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const Navbar = () => {
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="font-heading text-2xl lg:text-3xl font-bold tracking-wider uppercase text-foreground">
            KICK<span className="text-neon">ZONE</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-body text-sm tracking-widest uppercase font-medium text-foreground">
            <Link to="/" className="hover-neon transition-colors duration-300">Home</Link>
            <Link to="/shop" className="hover-neon transition-colors duration-300">Shop</Link>
            <Link to="/shop?category=running" className="hover-neon transition-colors duration-300">Running</Link>
            <Link to="/shop?category=basketball" className="hover-neon transition-colors duration-300">Basketball</Link>
            <Link to="/shop?category=football" className="hover-neon transition-colors duration-300">Football</Link>
          </div>

          <div className="flex items-center gap-4 text-foreground">
            <Link to="/shop" className="hover-neon transition-colors duration-300"><Search className="w-5 h-5" /></Link>
            <Link to="/wishlist" className="hover-neon transition-colors duration-300"><Heart className="w-5 h-5" /></Link>
            <Link to="/cart" className="hover-neon transition-colors duration-300 relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-neon text-accent-foreground rounded-full text-xs flex items-center justify-center font-body font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden hover-neon transition-colors duration-300" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="flex flex-col px-4 py-6 gap-4 font-body text-sm tracking-widest uppercase font-medium text-foreground">
            <Link to="/" onClick={() => setMobileOpen(false)} className="hover-neon transition-colors py-2">Home</Link>
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="hover-neon transition-colors py-2">Shop</Link>
            <Link to="/shop?category=running" onClick={() => setMobileOpen(false)} className="hover-neon transition-colors py-2">Running</Link>
            <Link to="/shop?category=basketball" onClick={() => setMobileOpen(false)} className="hover-neon transition-colors py-2">Basketball</Link>
            <Link to="/shop?category=football" onClick={() => setMobileOpen(false)} className="hover-neon transition-colors py-2">Football</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
