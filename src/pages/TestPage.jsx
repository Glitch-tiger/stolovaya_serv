import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TestPage() {
  // 4 новых блюда с реальными картинками
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: 'Суп картофельный с бобовыми',
      description: 'С горохом',
      weight: '200 г',
      price: 55,
      image:
        'https://main-cdn.sbermegamarket.ru/big1/hlr-system/156/312/944/111/623/27/100045246787b0.jpg',
      showDetails: false,
      ingredients: ['Картофель', 'Горох', 'Лук', 'Морковь', 'Зелень', 'Специи'],
    },
    {
      id: 2,
      name: 'Салат из свежих помидор и огурцов',
      description: 'Овощной салат',
      weight: '100 г',
      price: 65,
      image:
        'https://avatars.mds.yandex.net/i?id=929e6dd2bd2ca1cc8a5d29a62d62e6bfb4709a90-5255540-images-thumbs&n=13',
      showDetails: false,
      ingredients: ['Помидоры', 'Огурцы', 'Лук', 'Зелень', 'Растительное масло', 'Соль'],
    },
    {
      id: 3,
      name: 'Салат Цезарь',
      description: 'Классический',
      weight: '120 г',
      price: 80,
      image:
        'https://images-foodtech.magnit.ru/8g3vTR3-SR0-jFPIFjTLplegPoabO_JQbeHKoLXjZI8/rs:fit:1600:1600/plain/s3:/img-dostavka/uf/311/31144c68beed8ef8a6c9d03c33de791c/05f7d67d24f6f9d6b8c96e71cb5a84fd.jpeg@webp',
      showDetails: false,
      ingredients: ['Куриное филе', 'Салат Айсберг', 'Пармезан', 'Сухарики', 'Соус Цезарь'],
    },
    {
      id: 4,
      name: 'Пирожное «Чоко пай»',
      description: 'Шоколадное пирожное',
      weight: '28 г',
      price: 25,
      image: 'https://coffeespace.ru/upload/iblock/cf9/jek2k039jp34ixryo6ibkgl1d28b7lsw.jpg',
      showDetails: false,
      ingredients: ['Шоколад', 'Бисквит', 'Сливочный крем', 'Какао', 'Сахар'],
    },
  ]);

  const [cart, setCart] = useState([]);

  // Функция переключения показа состава
  const toggleDetails = (id) => {
    setDishes(
      dishes.map((dish) => (dish.id === id ? { ...dish, showDetails: !dish.showDetails } : dish))
    );
  };

  // Функция добавления в корзину
  const addToCart = (dish) => {
    setCart([...cart, dish]);
    alert(`"${dish.name}" добавлен в корзину!`);
  };

  return (
    <div className="container mt-4">
      {/* Заголовок - компактный */}
      <div className="text-center mb-4">
        <h1 className="text-primary mb-2" style={{ fontSize: '1.8rem' }}>
          🍽️ Меню столовой
        </h1>
        <p className="text-muted mb-3 small">Выберите блюда для заказа</p>

        {/* Кнопка корзины */}
        <a
          href="/test-page2"
          className="btn btn-outline-primary btn-sm mb-3"
          style={{ padding: '6px 15px', fontSize: '0.9rem' }}
        >
          🛒 Перейти в корзину
        </a>
      </div>

      {/* Сетка блюд - компактные карточки */}
      <div className="row row-cols-2 row-cols-md-4 g-3">
        {dishes.map((dish) => (
          <div key={dish.id} className="col">
            <div className="card h-100 shadow-sm border">
              {/* Квадратное изображение */}
              <div className="position-relative" style={{ paddingTop: '100%' }}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    objectFit: 'cover',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/150/FF6B6B/FFFFFF?text=${dish.name.substring(0, 10)}`;
                  }}
                />
              </div>

              <div className="card-body p-2">
                {/* Название - компактное */}
                <h6 className="card-title mb-1" style={{ fontSize: '0.9rem', lineHeight: '1.2' }}>
                  {dish.name}
                </h6>

                {/* Вес и цена в одной строке */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">{dish.weight}</small>
                  <strong className="text-primary" style={{ fontSize: '0.95rem' }}>
                    {dish.price} ₽
                  </strong>
                </div>

                {/* Кнопки - вертикально */}
                <div className="d-grid gap-1">
                  <button
                    className="btn btn-primary btn-sm py-1"
                    onClick={() => addToCart(dish)}
                    style={{ fontSize: '0.8rem' }}
                  >
                    🛒 В корзину
                  </button>

                  <button
                    className={`btn btn-outline-${dish.showDetails ? 'danger' : 'secondary'} btn-sm py-1`}
                    onClick={() => toggleDetails(dish.id)}
                    style={{ fontSize: '0.8rem' }}
                  >
                    {dish.showDetails ? '✖️' : '📋'}
                  </button>
                </div>

                {/* Детали состава - компактные */}
                {dish.showDetails && (
                  <div className="mt-2 pt-2 border-top">
                    <p className="mb-1 small">
                      <strong>Состав:</strong>
                    </p>
                    <p className="mb-0 small text-muted" style={{ fontSize: '0.75rem' }}>
                      {dish.ingredients.slice(0, 2).join(', ')}
                      {dish.ingredients.length > 2 && '...'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Компактная информация */}
      <div className="mt-4">
        <div className="row g-2">
          <div className="col-6">
            <div className="card bg-light border-0">
              <div className="card-body p-2 text-center">
                <small className="text-muted">🕒 8:00-17:00</small>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card bg-light border-0">
              <div className="card-body p-2 text-center">
                <small className="text-muted">📍 1 этаж</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Компактная инструкция */}
      <div className="mt-3">
        <details className="border rounded p-2">
          <summary className="small text-muted" style={{ cursor: 'pointer', outline: 'none' }}>
            💡 Как заказать
          </summary>
          <ol className="mt-2 mb-0 small" style={{ fontSize: '0.8rem' }}>
            <li>Выберите блюда</li>
            <li>Нажмите "В корзину"</li>
            <li>Перейдите в корзину</li>
            <li>Оформите заказ</li>
          </ol>
        </details>
      </div>
    </div>
  );
}

export default TestPage;
