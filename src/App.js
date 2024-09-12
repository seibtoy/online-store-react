import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/home-page'; 
import CartContent from './pages/cart';
import MainContact from './pages/contact';
import MainShipment from './pages/shipment';
import MainConf from './pages/confirmation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<CartContent />} />
        <Route path="/contact" element={<MainContact />} />
        <Route path="/shipment" element={<MainShipment />} />
        <Route path="/confirmation" element={<MainConf />} />
        <Route path="/home-page" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
