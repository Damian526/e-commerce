// App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./ui/ProtectedRoute";
import AuthInitializer from "./features/authentication/AuthInitializer";
import ProductDetails from "./features/products/ProductDetails";
import ForgotPassword from "./pages/ForgotPassword";

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route
                path="account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route path="cart" element={<Cart />} />
            </Route>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </AuthInitializer>
    </QueryClientProvider>
  );
}

export default App;
