import { Link } from 'react-router-dom';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center px-4">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="heading-display text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="font-body text-muted-foreground mb-8">Discover our premium collection</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold transition-colors">
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const shipping = cartTotal >= 30 ? 0 : 3;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-8 py-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display text-3xl md:text-4xl font-bold mb-10"
          >
            Shopping Cart
          </motion.h1>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map(item => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 sm:gap-6 border-b border-border pb-6"
                >
                  <Link to={`/product/${item.product.id}`} className="w-24 h-24 sm:w-32 sm:h-32 bg-secondary shrink-0 overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/product/${item.product.id}`} className="font-heading font-semibold text-sm sm:text-base hover-gold transition-colors">{item.product.name}</Link>
                        <p className="font-body text-xs text-muted-foreground mt-1">Size: {item.size} · Color: {item.color}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center font-body text-xs font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-heading font-semibold">{(item.product.price * item.quantity).toFixed(2)} KWD</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-secondary p-8">
              <h2 className="font-heading text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-3 font-body text-sm border-b border-border pb-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{cartTotal.toFixed(2)} KWD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `${shipping.toFixed(2)} KWD`}</span>
                </div>
              </div>
              <div className="flex justify-between font-heading text-lg font-semibold mb-8">
                <span>Total</span>
                <span>{(cartTotal + shipping).toFixed(2)} KWD</span>
              </div>
              <button className="w-full bg-primary text-primary-foreground py-4 font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold transition-colors duration-300 mb-3">
                Proceed to Checkout
              </button>
              <p className="text-center font-body text-xs text-muted-foreground">Cash on Delivery available</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
