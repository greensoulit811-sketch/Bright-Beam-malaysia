import { useOrders, useUpdateOrderStatus } from '@/hooks/useDatabase';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const OrdersManager = () => {
  const { data: orders = [], isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Order updated to ${status}`);
    } catch { toast.error('Failed to update'); }
  };

  if (isLoading) return <p className="text-center py-10 text-muted-foreground">Loading orders...</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Orders</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">{orders.length} total orders</p>
      </div>
      <div className="space-y-4">
        {orders.map(order => {
          const items = (order.items as any[]) || [];
          return (
            <div key={order.id} className="bg-card border border-border p-6 rounded-lg hover:border-primary/20 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading text-lg font-bold uppercase text-foreground">{order.order_number}</h3>
                    <span className={`px-2 py-1 text-xs font-body font-bold rounded-full uppercase ${statusColors[order.status] || ''}`}>{order.status}</span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <select value={order.status} onChange={e => handleStatusChange(order.id, e.target.value)}
                  className="px-4 py-2 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary">
                  {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">Customer</p>
                  <p className="font-body text-sm font-semibold text-foreground">{order.customer_name}</p>
                  <p className="font-body text-xs text-muted-foreground">{order.customer_email}</p>
                  <p className="font-body text-xs text-muted-foreground">{order.customer_phone}</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">{order.shipping_address}</p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">Items</p>
                  {items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between font-body text-sm py-1 text-foreground">
                      <span>{item.productName} (Size {item.size}, {item.color}) x{item.quantity}</span>
                      <span className="font-semibold">{item.price * item.quantity} KWD</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-heading text-base font-bold mt-2 pt-2 border-t border-border text-foreground">
                    <span>Total</span>
                    <span className="text-primary">{Number(order.total)} KWD</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersManager;
