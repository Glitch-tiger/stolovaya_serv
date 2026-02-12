import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import УправлениеМеню from "./pages/УправлениеМеню";
import Корзина from "./pages/Корзина";
import ИсторияЗаказов from "./pages/ИсторияЗаказов";
import Вход from "./pages/Вход";                    // импорт правильный
import ЛичныйКабинет from "./pages/ЛичныйКабинет";

function Приложение() {
  return (
    <div>
      <nav style={{ 
        padding: '15px', 
        background: '#2c3e50',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <Link to="/меню" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>
          🍽️ Меню
        </Link>
        <Link to="/корзина" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>
          🛒 Корзина
        </Link>
        <Link to="/история-заказов" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>
          📜 История заказов
        </Link>
        <Link to="/вход" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>
          🔐 Вход
        </Link>
        <Link to="/личный-кабинет" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>
          👤 Личный кабинет
        </Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<УправлениеМеню />} />
        <Route path="/меню" element={<УправлениеМеню />} />
        <Route path="/корзина" element={<Корзина />} />
        <Route path="/история-заказов" element={<ИсторияЗаказов />} />
        <Route path="/вход" element={<Вход />} />              {/* ИСПРАВЛЕНО! */}
        <Route path="/личный-кабинет" element={<ЛичныйКабинет />} />
      </Routes>
    </div>
  );
}

export default Приложение;