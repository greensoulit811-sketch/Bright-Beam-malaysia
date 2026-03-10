import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import WishlistPage from "./pages/WishlistPage.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import ProductsManager from "./pages/admin/ProductsManager.tsx";
import OrdersManager from "./pages/admin/OrdersManager.tsx";
import CouponsManager from "./pages/admin/CouponsManager.tsx";
import BannersManager from "./pages/admin/BannersManager.tsx";
import AnalyticsPage from "./pages/admin/AnalyticsPage.tsx";
import CustomersPage from "./pages/admin/CustomersPage.tsx";
import SettingsPage from "./pages/admin/SettingsPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ProductsManager />} />
                <Route path="orders" element={<OrdersManager />} />
                <Route path="coupons" element={<CouponsManager />} />
                <Route path="banners" element={<BannersManager />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppButton />
          </BrowserRouter>
        </AdminProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
