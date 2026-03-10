import { useAdmin } from '@/context/AdminContext';
import type { Order } from '@/context/AdminContext';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  confirmed: 'bg-blue-500/20 text-blue-400',
  shipped: 'bg-purple-500/20 text-purple-400',
  delivered: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const statuses: Order['status'][] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const OrdersManager = () => {
  const { orders, updateOrderStatus } = useAdmin();

  const handleStatusChange = (id: string, status: Order['status']) => {
    updateOrderStatus(id, status);
    toast.success(`Order ${id} updated to ${status}`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider">Orders</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">{orders.length} total orders</p>
      </div>

      <div className="space-y-4">
        {orders.slice().reverse().map(order => (
          <div key={order.id} className="bg-card border border-border p-6 hover:border-neon/20 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-heading text-lg font-bold uppercase">{order.id}</h3>
                  <span className={`px-2 py-1 text-xs font-body font-bold rounded-sm uppercase ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground mt-1">{order.createdAt}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={order.status}
                  onChange={e => handleStatusChange(order.id, e.target.value as Order['status'])}
                  className="px-4 py-2 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon"
                >
                  {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">Customer</p>
                <p className="font-body text-sm font-semibold">{order.customerName}</p>
                <p className="font-body text-xs text-muted-foreground">{order.customerEmail}</p>
                <p className="font-body text-xs text-muted-foreground">{order.customerPhone}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{order.shippingAddress}</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">Items</p>
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between font-body text-sm py-1">
                    <span>{item.productName} (Size {item.size}, {item.color}) x{item.quantity}</span>
                    <span className="font-semibold">{item.price * item.quantity} KWD</span>
                  </div>
                ))}
                <div className="flex justify-between font-heading text-base font-bold mt-2 pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-neon">{order.total} KWD</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersManager;
