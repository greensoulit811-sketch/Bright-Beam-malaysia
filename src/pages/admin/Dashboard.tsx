import { useAdmin } from '@/context/AdminContext';
import { products as catalogProducts } from '@/data/products';
import { Package, ShoppingCart, DollarSign, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const { orders, products: adminProducts } = useAdmin();
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

  const COLORS = ['hsl(217, 91%, 56%)', 'hsl(210, 100%, 45%)', 'hsl(0, 80%, 56%)', 'hsl(45, 100%, 50%)', 'hsl(160, 70%, 40%)'];

  const tooltipStyle = { background: '#fff', border: '1px solid hsl(220, 13%, 89%)', borderRadius: 8, fontFamily: 'Inter', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' };
  const gridStroke = 'hsl(220, 13%, 91%)';
  const axisStroke = 'hsl(220, 10%, 60%)';

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Dashboard</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Welcome back to KICKZONE admin</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-card border border-border p-6 rounded-lg hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-5 h-5 text-primary" />
              <span className="font-body text-xs text-primary font-semibold">{stat.change}</span>
            </div>
            <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="font-body text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2 bg-card border border-border p-6 rounded-lg">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="name" stroke={axisStroke} fontSize={12} />
              <YAxis stroke={axisStroke} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="revenue" fill="hsl(217, 91%, 56%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border p-6 rounded-lg">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border p-6 rounded-lg">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">Weekly Orders</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={orderTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="name" stroke={axisStroke} fontSize={12} />
              <YAxis stroke={axisStroke} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="orders" stroke="hsl(217, 91%, 56%)" strokeWidth={2} dot={{ fill: 'hsl(217, 91%, 56%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border p-6 rounded-lg">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(-5).reverse().map(order => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{order.id}</p>
                  <p className="font-body text-xs text-muted-foreground">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-body text-sm font-bold text-primary">{order.total} KWD</p>
                  <span className={`inline-block px-2 py-0.5 text-xs font-body font-semibold rounded-full uppercase ${statusColors[order.status]}`}>
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
