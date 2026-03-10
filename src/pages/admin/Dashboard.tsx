import { useAdmin } from '@/context/AdminContext';
import { products as catalogProducts } from '@/data/products';
import { Package, ShoppingCart, DollarSign, TrendingUp, Users, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const { orders, coupons, products: adminProducts } = useAdmin();
  const allProducts = catalogProducts.length + adminProducts.length;

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  const stats = [
    { label: 'Total Revenue', value: `${totalRevenue} KWD`, icon: DollarSign, change: '+12.5%' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingCart, change: '+8.2%' },
    { label: 'Products', value: allProducts, icon: Package, change: `${adminProducts.length} custom` },
    { label: 'Pending Orders', value: pendingOrders, icon: Clock, change: `${deliveredOrders} delivered` },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 450 }, { name: 'Feb', revenue: 680 },
    { name: 'Mar', revenue: 820 }, { name: 'Apr', revenue: 540 },
    { name: 'May', revenue: 720 }, { name: 'Jun', revenue: 890 },
  ];

  const categoryData = [
    { name: 'Running', value: 35 }, { name: 'Basketball', value: 25 },
    { name: 'Football', value: 20 }, { name: 'Lifestyle', value: 15 },
    { name: 'Training', value: 5 },
  ];

  const orderTrend = [
    { name: 'Mon', orders: 5 }, { name: 'Tue', orders: 8 },
    { name: 'Wed', orders: 12 }, { name: 'Thu', orders: 7 },
    { name: 'Fri', orders: 15 }, { name: 'Sat', orders: 20 },
    { name: 'Sun', orders: 18 },
  ];

  const COLORS = ['hsl(83, 100%, 48%)', 'hsl(210, 100%, 56%)', 'hsl(0, 85%, 55%)', 'hsl(45, 100%, 50%)', 'hsl(280, 70%, 50%)'];

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    confirmed: 'bg-blue-500/20 text-blue-400',
    shipped: 'bg-purple-500/20 text-purple-400',
    delivered: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider">Dashboard</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Welcome back to KICKZONE admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-card border border-border p-6 hover:border-neon/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-5 h-5 text-neon" />
              <span className="font-body text-xs text-neon font-semibold">{stat.change}</span>
            </div>
            <p className="font-heading text-2xl font-bold">{stat.value}</p>
            <p className="font-body text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card border border-border p-6">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(0, 0%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(0, 0%, 55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'hsl(0, 0%, 9%)', border: '1px solid hsl(0, 0%, 18%)', borderRadius: 4, fontFamily: 'Inter' }} />
              <Bar dataKey="revenue" fill="hsl(83, 100%, 48%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="bg-card border border-border p-6">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(0, 0%, 9%)', border: '1px solid hsl(0, 0%, 18%)', borderRadius: 4, fontFamily: 'Inter' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order Trend + Recent Orders */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Order Trend */}
        <div className="bg-card border border-border p-6">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4">Weekly Orders</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={orderTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(0, 0%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(0, 0%, 55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'hsl(0, 0%, 9%)', border: '1px solid hsl(0, 0%, 18%)', borderRadius: 4, fontFamily: 'Inter' }} />
              <Line type="monotone" dataKey="orders" stroke="hsl(83, 100%, 48%)" strokeWidth={2} dot={{ fill: 'hsl(83, 100%, 48%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-card border border-border p-6">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(-5).reverse().map(order => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-body text-sm font-semibold">{order.id}</p>
                  <p className="font-body text-xs text-muted-foreground">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-body text-sm font-bold text-neon">{order.total} KWD</p>
                  <span className={`inline-block px-2 py-0.5 text-xs font-body font-semibold rounded-sm uppercase ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
