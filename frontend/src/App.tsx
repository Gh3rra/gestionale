import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Navbar from "./pages/navbar/Navbar";
import Sidebar from "./pages/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customers/Customers";
import Commissions from "./pages/commissions/Commissions";
import Suppliers from "./pages/suppliers/Suppliers";
import AddCommission from "./pages/add-commission/AddCommission";
import CommissionDetail from "./pages/commission-detail/CommissionDetail";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminNavbar from "./pages/admin/Navbar";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-row min-h-screen [&_svg]:text-secondary-text">
              <Navbar />
              <Sidebar />
              <Outlet />
            </div>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/commission-detail/:id" element={<CommissionDetail />} />
        </Route>
        <Route
          path="/add-commission"
          element={
            <div className="flex flex-col w-screen min-h-screen [&_svg]:text-secondary-text">
              <Navbar />
              <AddCommission />
            </div>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <div className="flex flex-row min-h-screen [&_svg]:text-secondary-text">
              <AdminNavbar />
              {user && <Outlet />}
            </div>
          }
        >
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
