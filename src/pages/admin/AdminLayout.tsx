import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Tag, Image, Settings, Users, BarChart3, ChevronLeft, Menu } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/products', label: 'Products', icon: Package },
  { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/admin/coupons', label: 'Coupons', icon: Tag },
  { path: '/admin/banners', label: 'Banners', icon: Image },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/admin/customers', label: 'Customers', icon: Users },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-card border-r border-border flex flex-col shrink-0 transition-all duration-300 fixed h-full z-40`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <Link to="/admin" className="font-heading text-xl font-bold tracking-wider uppercase">
              KICK<span className="text-neon">ZONE</span>
              <span className="text-xs text-muted-foreground block font-body font-normal tracking-normal normal-case">Admin Panel</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground hover:text-foreground transition-colors">
            {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map(item => {
            const active = isActive(item.path, item.exact);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm font-body text-sm transition-all ${
                  active
                    ? 'bg-neon/10 text-neon border-l-2 border-neon'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Back to store */}
        <div className="p-3 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-sm font-body text-sm text-muted-foreground hover:text-neon transition-colors"
          >
            <ChevronLeft className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Back to Store</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${collapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
