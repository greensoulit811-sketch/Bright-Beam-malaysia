import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import WhatsAppButton from "@/components/WhatsAppButton";
import FacebookPixelProvider from "@/components/FacebookPixelProvider";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import VisitorTracker from "@/components/VisitorTracker";
import Index from "./pages/Index.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import WishlistPage from "./pages/WishlistPage.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminLoginPage from "./pages/admin/AdminLoginPage.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import ProductsManager from "./pages/admin/ProductsManager.tsx";
import OrdersManager from "./pages/admin/OrdersManager.tsx";
import OrderDetailsPage from "./pages/admin/OrderDetailsPage.tsx";
import CouponsManager from "./pages/admin/CouponsManager.tsx";
import CheckoutLeadsManager from "./pages/admin/CheckoutLeadsManager.tsx";
import CategoriesManager from "./pages/admin/CategoriesManager.tsx";
import BannersManager from "./pages/admin/BannersManager.tsx";
import AnalyticsPage from "./pages/admin/AnalyticsPage.tsx";
import VisitorAnalyticsPage from "./pages/admin/VisitorAnalyticsPage.tsx";
import ShippingMethodsManager from "./pages/admin/ShippingMethodsManager.tsx";
import CustomersPage from "./pages/admin/CustomersPage.tsx";
import SettingsPage from "./pages/admin/SettingsPage.tsx";
import MarketingTrackingPage from "./pages/admin/MarketingTrackingPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <AdminAuthProvider>
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
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ProductsManager />} />
                <Route path="orders" element={<OrdersManager />} />
                <Route path="orders/:id" element={<OrderDetailsPage />} />
                <Route path="categories" element={<CategoriesManager />} />
                <Route path="coupons" element={<CouponsManager />} />
                <Route path="checkout-leads" element={<CheckoutLeadsManager />} />
                <Route path="banners" element={<BannersManager />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="visitor-analytics" element={<VisitorAnalyticsPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="marketing" element={<MarketingTrackingPage />} />
                <Route path="shipping" element={<ShippingMethodsManager />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <VisitorTracker />
            <WhatsAppButton />
            <FacebookPixelProvider />
          </BrowserRouter>
        </AdminAuthProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
