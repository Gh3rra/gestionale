import "./App.css";
import Commissions from "./components/Commission/Commissions";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="layout">
      <Navbar />
      <Sidebar />
      <Commissions/>
    </div>
  );
}

export default App;
