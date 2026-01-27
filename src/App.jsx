import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import TestPage from "./pages/TestPage";
import TestPage2 from "./pages/TestPage2";
import TestPage3 from "./pages/TestPage3";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <div>
      <div style={{ 
        padding: '15px', 
        background: '#2c3e50',
        marginBottom: '20px'
      }}>
        <Link to="/menu" style={{ color: 'white', marginRight: '15px' }}>
          Меню
        </Link>
        <Link to="/cart" style={{ color: 'white', marginRight: '15px' }}>
          Корзина
        </Link>
        <Link to="/orders" style={{ color: 'white', marginRight: '15px' }}>
          История заказов
        </Link>
        <Link to="/profile" style={{ color: 'white' }}>
          Профиль
        </Link>
      </div>
      
      <Routes>
        <Route path="/menu" element={<TestPage />} />
        <Route path="/cart" element={<TestPage2 />} />
        <Route path="/orders" element={<TestPage3 />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;