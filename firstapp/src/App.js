import './App.css';
import Home from './Home';
import Supplier from './Supplier';
import Manufacturer from './Manufacturer' ;
import Distributor from './Distributor' ;
import Retailer from './Retailer' ;
import AddRawMaterialLot from './AddRawMaterialLot';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/supplier" element={<Supplier/>} />
        <Route path="/manufacturer" element={<Manufacturer />} />
        <Route path="/distributor" element={<Distributor />} />
        <Route path="/retailer" element={<Retailer />} />
        <Route path="/addRawMaterialLot" element={<AddRawMaterialLot />} />
      </Routes>
    </Router>
  );
}

export default App;
