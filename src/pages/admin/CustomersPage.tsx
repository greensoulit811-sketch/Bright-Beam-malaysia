import { useAdmin } from '@/context/AdminContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const CustomersPage = () => {
  const { orders } = useAdmin();

  // Derive unique customers from orders
  const customersMap = new Map<string, { name: string; email: string; phone: string; address: string; orders: number; totalSpent: number; lastOrder: string }>();
  orders.forEach(o => {
    const existing = customersMap.get(o.customerEmail);
    if (existing) {
      existing.orders += 1;
      existing.totalSpent += o.total;
      if (o.createdAt > existing.lastOrder) existing.lastOrder = o.createdAt;
    } else {
      customersMap.set(o.customerEmail, {
        name: o.customerName, email: o.customerEmail, phone: o.customerPhone,
        address: o.shippingAddress, orders: 1, totalSpent: o.total, lastOrder: o.createdAt,
      });
    }
  });

  const customers = Array.from(customersMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider">Customers</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">{customers.length} customers</p>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border">
          <p className="font-heading text-xl uppercase font-bold mb-2">No Customers Yet</p>
          <p className="font-body text-sm text-muted-foreground">Customers will appear here after orders are placed</p>
        </div>
      ) : (
        <div className="bg-card border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Customer</th>
                <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Contact</th>
                <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Orders</th>
                <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Total Spent</th>
                <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.email} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neon/10 rounded-full flex items-center justify-center font-heading font-bold text-neon">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold">{c.name}</p>
                        <p className="font-body text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-body text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {c.email}</p>
                    <p className="font-body text-xs text-muted-foreground flex items-center gap-1 mt-1"><Phone className="w-3 h-3" /> {c.phone}</p>
                  </td>
                  <td className="p-4 font-body text-sm font-semibold">{c.orders}</td>
                  <td className="p-4 font-body text-sm font-bold text-neon">{c.totalSpent} KWD</td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{c.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
