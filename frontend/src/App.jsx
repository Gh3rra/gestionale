import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

import Commissions from "./components/List/Components/Commissions";
import Customers from "./components/List/Components/Customers";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Suppliers from "./components/List/Components/Suppliers";

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
