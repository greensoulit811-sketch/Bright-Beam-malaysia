import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src="/logo.png" alt="SRK Collection" className="h-14 w-auto mb-4" />
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed mb-6">
              Your ultimate destination for authentic sports footwear in Kuwait. Nike, Adidas, Puma, and more.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/40 hover:text-neon transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-primary-foreground/40 hover:text-neon transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-primary-foreground/40 hover:text-neon transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-primary-foreground/40 hover:text-neon transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/60">
              <li><Link to="/shop?category=running" className="hover:text-neon transition-colors">Running</Link></li>
              <li><Link to="/shop?category=basketball" className="hover:text-neon transition-colors">Basketball</Link></li>
              <li><Link to="/shop?category=football" className="hover:text-neon transition-colors">Football</Link></li>
              <li><Link to="/shop?category=lifestyle" className="hover:text-neon transition-colors">Lifestyle</Link></li>
              <li><Link to="/shop?category=training" className="hover:text-neon transition-colors">Training</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold uppercase tracking-wider mb-4">Brands</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/60">
              <li><Link to="/shop" className="hover:text-neon transition-colors">Nike</Link></li>
              <li><Link to="/shop" className="hover:text-neon transition-colors">Adidas</Link></li>
              <li><Link to="/shop" className="hover:text-neon transition-colors">Puma</Link></li>
              <li><Link to="/shop" className="hover:text-neon transition-colors">ASICS</Link></li>
              <li><Link to="/shop" className="hover:text-neon transition-colors">New Balance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold uppercase tracking-wider mb-4">Help</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-neon transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">Contact Us</a></li>
            </ul>
            <div className="mt-6 font-body text-sm text-primary-foreground/40">
              <p>Kuwait City, Kuwait</p>
              <p>info@srkcollection.kw</p>
              <p>+965 1234 5678</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-primary-foreground/40">© 2026 KICKZONE. All rights reserved.</p>
          <p className="font-body text-xs text-primary-foreground/40">🇰🇼 Free delivery across Kuwait · Cash on Delivery available</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
