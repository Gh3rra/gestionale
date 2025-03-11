import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import Commissions from "./components/List/Components/Commissions";
import Customers from "./components/List/Components/Customers";
import Suppliers from "./components/List/Components/Suppliers";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AddCommission from "./components/add-commission/AddCommission";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="layout">
              <Navbar />
              <Sidebar />
              <Outlet />
            </div>
          }
        >
          <Route path="/customers" element={<Customers />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Route>
        <Route
          path="/add-commission"
          element={
            <div className="layout">
              <Navbar />
              <Sidebar />
              <AddCommission />
              
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
