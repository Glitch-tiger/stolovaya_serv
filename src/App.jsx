import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Test_Page from "./pages/test_Page";
import Test_Page2 from "./pages/test_Pages2";
import Test_Page3 from './pages/test_pages3';

function App() {

  return (
    <div>
      <div className="mb-4">
        <Link to="/test-page" className="btn btn-secondary me-2">
          Перейти на Страницу 1
        </Link>
        <Link to="/test-page2" className="btn btn-secondary">
          Перейти на Страницу 2
        </Link>
      </div>
      
      <Routes>
        <Route path="/test-page" element={<Test_Page />} />
        <Route path="/test-page2" element={<Test_Page2 />} />
        <Route path="/test-page3" element={<Test_Page3 />} />
      </Routes>
    </div>
  );
}

export default App;