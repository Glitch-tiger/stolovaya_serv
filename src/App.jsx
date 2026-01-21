import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Импортируем компоненты страниц
import TestPage from "./pages/TestPage";
import TestPage2 from "./pages/TestPage2";
import TestPage3 from "./pages/TestPage3";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import Users from "./pages/Users";

function App() {
  return (
    <div>
      {/* Навигационная панель */}
      <nav style={{ 
        padding: '15px', 
        background: '#2c3e50',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <Link to="/users" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          transition: 'background 0.3s'
        }}>
          🎓 Ученики
        </Link>
        <Link to="/test-page" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          transition: 'background 0.3s'
        }}>
          🍽️ Меню
        </Link>
        <Link to="/test-page2" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          transition: 'background 0.3s'
        }}>
          🛒 Корзина
        </Link>
        <Link to="/test-page3" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          transition: 'background 0.3s'
        }}>
          📜 История заказов
        </Link>
        <Link to="/login-page" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          transition: 'background 0.3s'
        }}>
          🔐 Вход
        </Link>
        <Link to="/profile" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          transition: 'background 0.3s'
        }}>
          👤 Профиль
        </Link>
      </nav>
      
      {/* Определение маршрутов */}
      <Routes>
        <Route path="/" element={<TestPage />} /> {/* Главная страница - меню */}
        <Route path="/users" element={<Users />} />
        <Route path="/test-page" element={<TestPage />} />
        <Route path="/test-page2" element={<TestPage2 />} />
        <Route path="/test-page3" element={<TestPage3 />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;