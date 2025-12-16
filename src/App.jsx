import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Test_Page from "./pages/TestPage";
import Test_Page2 from "./pages/TestPage2";
import Test_Page3 from "./pages/TestPage3";
import UserProfile from "./pages/UserProfile";

function App() {

  return (
    <div>
      <div style={{ 
        padding: '15px', 
        background: '#2c3e50',
        marginBottom: '20px'
      }}>
        <Link to="/test-page" style={{ color: 'white', marginRight: '15px' }}>
          Меню
        </Link>
        <Link to="/test-page2" style={{ color: 'white', marginRight: '15px' }}>
          Корзина
        </Link>
        <Link to="/test-page3" style={{ color: 'white', marginRight: '15px' }}>
          История заказов
        </Link>
        <Link to="/profile" style={{ color: 'white' }}>
          Профиль
        </Link>
      </div>
      
      <Routes>
        <Route path="/test-page" element={<Test_Page />} />
        <Route path="/test-page2" element={<Test_Page2 />} />
        <Route path="/test-page3" element={<Test_Page3 />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;