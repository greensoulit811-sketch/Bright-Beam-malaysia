import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">
              LUXE<span className="text-gold">STEP</span>
            </h3>
            <p className="text-primary-foreground/70 font-body text-sm leading-relaxed mb-6">
              Premium quality shoes for men & women in Kuwait. Step into style with our curated collection.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/60 hover:text-gold transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-primary-foreground/60 hover:text-gold transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-primary-foreground/60 hover:text-gold transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/70">
              <li><Link to="/shop" className="hover:text-gold transition-colors">Shop All</Link></li>
              <li><Link to="/shop?category=men" className="hover:text-gold transition-colors">Men's Collection</Link></li>
              <li><Link to="/shop?category=women" className="hover:text-gold transition-colors">Women's Collection</Link></li>
              <li><Link to="/shop?category=sports" className="hover:text-gold transition-colors">Sports</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-gold transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/70">
              <li>Kuwait City, Kuwait</li>
              <li>info@luxestep.com</li>
              <li>+965 1234 5678</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center font-body text-xs text-primary-foreground/50">
          © 2026 LUXESTEP. All rights reserved. Cash on Delivery available across Kuwait.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
