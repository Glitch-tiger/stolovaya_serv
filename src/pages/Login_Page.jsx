import React from 'react';

function Login_Page() { 
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Форма входа</h1>
      
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Эл. адрес
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="staticEmail"
            defaultValue="email@example.com"
          />
        </div>
      </div>
      
      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Пароль
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
          />
        </div>
      </div>
      
      <button type="button" className="btn btn-primary">
        Войти
      </button>
    </div>
  );
}

export default Login_Page;  