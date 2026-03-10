import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAddOrder } from '@/hooks/useDatabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const CheckoutPage = () => {
  const { items, cartTotal, clearCart } = useCart();
  const addOrder = useAddOrder();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    area: '',
    block: '',
    notes: '',
  });

  const shipping = cartTotal >= 30 ? 0 : 3;
  const total = cartTotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.address || !form.area) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    const orderItems = items.map(item => ({
      productName: item.product.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const shippingAddress = `${form.address}, Block ${form.block}, ${form.area}, Kuwait`;
    const orderNumber = `ORD${String(Date.now()).slice(-6)}`;

    try {
      await addOrder.mutateAsync({
        order_number: orderNumber,
        customer_name: form.fullName,
        customer_email: form.email,
        customer_phone: form.phone,
        items: orderItems,
        total,
        status: 'pending',
        payment_method: 'cod',
        shipping_address: shippingAddress,
        notes: form.notes,
      });

      setOrderId(orderNumber);
      clearCart();
      setOrderPlaced(true);
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 text-center px-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
            <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
          </motion.div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">Order Confirmed! 🎉</h1>
          <p className="font-body text-muted-foreground mb-2">Your order <span className="font-bold text-primary">{orderId}</span> has been placed</p>
          <p className="font-body text-muted-foreground mb-8">Payment: Cash on Delivery 🇰🇼</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-body text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-all rounded-md">
              Continue Shopping
            </Link>
            <Link to="/" className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3 font-body text-sm font-bold tracking-wider uppercase hover:bg-muted transition-all rounded-md">
              Go Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-8 py-10">
          <Link to="/cart" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-10 text-foreground">Checkout</h1>
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-heading text-lg font-bold uppercase tracking-wider mb-6 text-foreground">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Full Name *</label>
                    <Input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Ahmed Al-Sabah" required />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Phone *</label>
                    <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+965 9900 1122" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Email</label>
                    <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ahmed@email.com" />
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-heading text-lg font-bold uppercase tracking-wider mb-6 text-foreground">Shipping Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Area *</label>
                    <Input name="area" value={form.area} onChange={handleChange} placeholder="Salmiya" required />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Block</label>
                    <Input name="block" value={form.block} onChange={handleChange} placeholder="5" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Street & Building *</label>
                    <Input name="address" value={form.address} onChange={handleChange} placeholder="Street 10, Building 5, Apt 3" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Notes</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Delivery instructions..."
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px]" />
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">Payment Method</h2>
                <div className="flex items-center gap-3 p-4 border-2 border-primary rounded-lg bg-primary/5">
                  <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-bold text-foreground">Cash on Delivery (COD)</p>
                    <p className="font-body text-xs text-muted-foreground">Pay when you receive your order 🇰🇼</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-fit">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-28">
                <h2 className="font-heading text-lg font-bold uppercase tracking-wider mb-6 text-foreground">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-14 h-14 bg-muted rounded overflow-hidden shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-xs font-bold truncate text-foreground">{item.product.name}</p>
                        <p className="font-body text-xs text-muted-foreground">Size {item.size} · {item.color} · x{item.quantity}</p>
                        <p className="font-body text-xs font-bold text-primary">{(item.product.price * item.quantity).toFixed(2)} KWD</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 font-body text-sm border-t border-border pt-4 mb-4">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{cartTotal.toFixed(2)} KWD</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'Free' : `${shipping.toFixed(2)} KWD`}</span></div>
                </div>
                <div className="flex justify-between font-heading text-xl font-bold border-t border-border pt-4 mb-6 text-foreground">
                  <span>Total</span><span className="text-primary">{total.toFixed(2)} KWD</span>
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-4 font-body text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-all duration-300 rounded-md disabled:opacity-50">
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
