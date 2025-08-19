import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Navbar from "./pages/navbar/Navbar";
import Sidebar from "./pages/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customers/Customers";
import Commissions from "./pages/commissions/Commissions";
import Suppliers from "./pages/suppliers/Suppliers";
import CommissionDetail from "./pages/commission-detail/CommissionDetail";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminNavbar from "./pages/admin/Navbar";
import { useAuth } from "./context/AuthContext";
import CustomerDetail from "./pages/customer-detail/CustomerDetail";
import SupplierDetail from "./pages/supplier-detail/SupplierDetail";
import Documents from "./pages/documents/Documents";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Cane from "./cane";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min = fresh
      gcTime: 10 * 60 * 1000, // 10 min = in memoria
      retry: 3, // 3 tentativi su errore
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  },
});

function App() {
  const { user } = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="flex min-h-screen flex-row">
                  <Navbar />
                  <Sidebar />
                  <Outlet />
                </div>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Outlet />}>
              <Route index element={<Customers />} />

              <Route path=":id/:type" element={<CustomerDetail />} />
            </Route>
            <Route path="commissions" element={<Outlet />}>
              <Route index element={<Commissions />} />
              <Route path=":id" element={<CommissionDetail />} />
            </Route>
            <Route path="suppliers" element={<Outlet />}>
              <Route index element={<Suppliers />} />
              <Route path=":id" element={<SupplierDetail />} />
            </Route>
            <Route path="graphs" element={<div>Graphs Page</div>} />
            <Route path="docs" element={<Documents />} />
            <Route path="settings" element={<div>Settings Page</div>} />
          </Route>
          {/* <Route path="/tuamadre" element={<Cane />} /> */}
          <Route
            path="admin"
            element={
              <div className="[&_svg]:text-secondary-text flex min-h-screen flex-row">
                <AdminNavbar />
                {user && <Outlet />}
              </div>
            }
          >
            <Route index element={<AdminPanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
