import { useAdmin } from '@/context/AdminContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AnalyticsPage = () => {
  const { orders } = useAdmin();

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  const monthlyData = [
    { month: 'Jan', revenue: 1250, orders: 28, visitors: 3400 },
    { month: 'Feb', revenue: 1680, orders: 35, visitors: 4200 },
    { month: 'Mar', revenue: totalRevenue || 2100, orders: orders.length || 42, visitors: 5100 },
    { month: 'Apr', revenue: 1890, orders: 38, visitors: 4800 },
    { month: 'May', revenue: 2340, orders: 48, visitors: 5600 },
    { month: 'Jun', revenue: 2780, orders: 56, visitors: 6200 },
  ];

  const trafficSources = [
    { source: 'Direct', visits: 2400 },
    { source: 'Google', visits: 1800 },
    { source: 'Instagram', visits: 1200 },
    { source: 'WhatsApp', visits: 800 },
    { source: 'Other', visits: 400 },
  ];

  const topProducts = [
    { name: 'Air Jordan Retro High OG', sales: 156, revenue: 7020 },
    { name: 'Ultraboost 24', sales: 124, revenue: 3968 },
    { name: 'Predator Elite FG', sales: 98, revenue: 5390 },
    { name: 'Air Max 97', sales: 87, revenue: 3045 },
    { name: 'Speedcross 6', sales: 65, revenue: 2730 },
  ];

  const tooltipStyle = { background: '#fff', border: '1px solid hsl(220, 13%, 89%)', borderRadius: 8, fontFamily: 'Inter', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' };
  const gridStroke = 'hsl(220, 13%, 91%)';
  const axisStroke = 'hsl(220, 10%, 60%)';

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Analytics</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Sales and traffic insights</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: `${totalRevenue.toLocaleString()} KWD` },
          { label: 'Avg Order Value', value: `${avgOrderValue.toFixed(1)} KWD` },
          { label: 'Conversion Rate', value: '3.2%' },
          { label: 'Total Visitors', value: '29,300' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-card border border-border p-5 rounded-lg">
            <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">{kpi.label}</p>
            <p className="font-heading text-2xl font-bold text-primary">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border p-6 rounded-lg mb-4">
        <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 56%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217, 91%, 56%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="month" stroke={axisStroke} fontSize={12} />
            <YAxis stroke={axisStroke} fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="revenue" stroke="hsl(217, 91%, 56%)" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border p-6 rounded-lg">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trafficSources} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis type="number" stroke={axisStroke} fontSize={12} />
              <YAxis type="category" dataKey="source" stroke={axisStroke} fontSize={12} width={80} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="visits" fill="hsl(217, 91%, 56%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border p-6 rounded-lg">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-lg font-bold text-primary w-6">#{i + 1}</span>
                  <div>
                    <p className="font-body text-sm font-semibold text-foreground">{p.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{p.sales} sold</p>
                  </div>
                </div>
                <span className="font-body text-sm font-bold text-primary">{p.revenue} KWD</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
