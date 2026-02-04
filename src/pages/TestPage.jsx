import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TestPage() {
  // Состояния
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    category: 'first',
    weight: '',
    price: '',
    image_url: '',
    ingredients: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Категории блюд
  const categories = [
    { id: 'first', name: 'Первые блюда', icon: '🍲' },
    { id: 'second', name: 'Вторые блюда', icon: '🍛' },
    { id: 'salad', name: 'Салаты', icon: '🥗' },
    { id: 'dessert', name: 'Десерты', icon: '🍰' },
    { id: 'drink', name: 'Напитки', icon: '🥤' }
  ];

  // Загрузка данных при запуске
  useEffect(() => {
    setLoading(true);
    
    // Загружаем блюда из localStorage
    const savedDishes = localStorage.getItem('local_dishes');
    if (savedDishes) {
      try {
        const parsedDishes = JSON.parse(savedDishes);
        setDishes(parsedDishes.map(dish => ({
          ...dish,
          showDetails: dish.showDetails || false
        })));
      } catch (error) {
        console.error('Ошибка загрузки блюд:', error);
        setDishes([]);
      }
    } else {
      // Нет сохраненных блюд - создаем пустой массив
      setDishes([]);
    }

    // Загружаем корзину из localStorage
    const savedCart = localStorage.getItem('school_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
        setCart([]);
      }
    }

    setLoading(false);
  }, []);

  // Сохраняем блюда в localStorage
  useEffect(() => {
    if (dishes.length > 0) {
      localStorage.setItem('local_dishes', JSON.stringify(dishes));
    } else {
      localStorage.removeItem('local_dishes');
    }
  }, [dishes]);

  // Сохраняем корзину в localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('school_cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('school_cart');
    }
  }, [cart]);

  // Функция добавления нового блюда
  const addNewDish = (e) => {
    e.preventDefault();
    
    // Валидация
    if (!newDish.name.trim()) {
      alert('Введите название блюда!');
      return;
    }
    
    if (!newDish.price || isNaN(parseFloat(newDish.price)) || parseFloat(newDish.price) <= 0) {
      alert('Введите корректную цену (больше 0)!');
      return;
    }

    const price = parseFloat(newDish.price);
    
    // Создаем уникальный ID для блюда
    const dishId = `dish_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Создаем новое блюдо
    const dishToAdd = {
      id: dishId,
      name: newDish.name.trim(),
      description: newDish.description.trim(),
      category: newDish.category,
      weight: newDish.weight.trim() || '200 г',
      price: price,
      image_url: newDish.image_url.trim() || `https://via.placeholder.com/300/FF6B6B/FFFFFF?text=${encodeURIComponent(newDish.name.substring(0, 10))}`,
      ingredients: newDish.ingredients.trim() || 'Состав не указан',
      showDetails: false,
      createdAt: new Date().toISOString()
    };
    
    // Добавляем блюдо в список
    setDishes(prevDishes => [...prevDishes, dishToAdd]);
    
    // Сбрасываем форму
    setNewDish({
      name: '',
      description: '',
      category: 'first',
      weight: '',
      price: '',
      image_url: '',
      ingredients: ''
    });
    
    // Показываем уведомление
    showNotification(`✅ Блюдо "${dishToAdd.name}" добавлено в меню!`, 'success');
  };

  // Функция добавления в корзину
  const addToCart = (dish) => {
    // Создаем уникальный ID для элемента корзины
    const cartItemId = `${dish.id}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    // Создаем элемент корзины
    const cartItem = {
      ...dish,
      cartId: cartItemId,
      quantity: 1,
      addedAt: new Date().toISOString()
    };
    
    // Добавляем в корзину
    setCart(prevCart => {
      const newCart = [...prevCart, cartItem];
      return newCart;
    });
    
    // Показываем уведомление
    showNotification(`✅ "${dish.name}" добавлено в корзину!`, 'success');
  };

  // Функция удаления блюда из меню
  const deleteDish = (dishId, dishName) => {
    if (window.confirm(`Вы уверены, что хотите удалить блюдо "${dishName}" из меню?`)) {
      setDishes(prevDishes => prevDishes.filter(dish => dish.id !== dishId));
      showNotification(`🗑️ Блюдо "${dishName}" удалено из меню!`, 'danger');
    }
  };

  // Функция переключения показа деталей
  const toggleDetails = (dishId) => {
    setDishes(prevDishes => 
      prevDishes.map(dish => 
        dish.id === dishId ? { ...dish, showDetails: !dish.showDetails } : dish
      )
    );
  };

  // Фильтрация блюд по категории
  const filteredDishes = selectedCategory === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.category === selectedCategory);

  // Подсчет блюд по категориям
  const categoryStats = {};
  dishes.forEach(dish => {
    if (dish.category) {
      categoryStats[dish.category] = (categoryStats[dish.category] || 0) + 1;
    }
  });

  // Общая стоимость корзины
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Вспомогательная функция для показа уведомлений
  const showNotification = (message, type = 'success') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
      <div class="d-flex align-items-center">
        <div class="me-2">${type === 'success' ? '✅' : '⚠️'}</div>
        <div class="flex-grow-1">${message}</div>
        <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
      if (alertDiv.parentElement) {
        alertDiv.classList.add('fade');
        setTimeout(() => alertDiv.remove(), 300);
      }
    }, 3000);
  };

  // Обработчик изменения формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Отображение загрузки
  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
        <p className="mt-2">Загрузка меню...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Заголовок */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="text-primary mb-1">🍽️ Меню столовой</h1>
          <p className="text-muted mb-0">
            Всего блюд: <strong>{dishes.length}</strong>
            <span className="badge bg-secondary ms-2">
              📍 Локальное хранилище
            </span>
          </p>
        </div>
        <div className="d-flex gap-2">
          <a 
            href="/test-page2" 
            className="btn btn-primary btn-sm position-relative"
          >
            🛒 Корзина
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            )}
          </a>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline-secondary btn-sm"
            title="Обновить страницу"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Информация */}
      <div className="card bg-light mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-1">Локальное меню</h5>
              <p className="card-text mb-0 small">
                Все данные сохраняются в вашем браузере. Блюда и корзина не пропадут после закрытия страницы.
              </p>
            </div>
            <div className="text-end">
              <div className="small">В корзине: <strong>{totalItems}</strong> позиций</div>
              <div className="small">Сумма: <strong>{cartTotal} ₽</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Форма добавления нового блюда */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">➕ Добавить новое блюдо</h5>
        </div>
        <div className="card-body">
          <form onSubmit={addNewDish}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Название блюда *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Например: Суп картофельный"
                  value={newDish.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-6">
                <label className="form-label">Категория *</label>
                <select
                  name="category"
                  className="form-select"
                  value={newDish.category}
                  onChange={handleInputChange}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-6">
                <label className="form-label">Описание</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Например: С горохом и зеленью"
                  value={newDish.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label">Вес</label>
                <input
                  type="text"
                  name="weight"
                  className="form-control"
                  placeholder="200 г"
                  value={newDish.weight}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label">Цена (₽) *</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="55"
                  value={newDish.price}
                  onChange={handleInputChange}
                  required
                  min="1"
                  step="0.01"
                />
              </div>
              
              <div className="col-md-6">
                <label className="form-label">URL картинки</label>
                <input
                  type="url"
                  name="image_url"
                  className="form-control"
                  placeholder="https://example.com/image.jpg"
                  value={newDish.image_url}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="col-md-6">
                <label className="form-label">Состав</label>
                <input
                  type="text"
                  name="ingredients"
                  className="form-control"
                  placeholder="Картофель, морковь, лук, зелень..."
                  value={newDish.ingredients}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="btn btn-success w-100 mt-3 py-2"
            >
              📝 Добавить блюдо в меню
            </button>
            
            <div className="alert alert-info mt-3 mb-0 small">
              💡 Блюдо будет сохранено в вашем браузере. Все добавленные блюда можно будет использовать для заказов.
            </div>
          </form>
        </div>
      </div>

      {/* Фильтры по категориям */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">📁 Фильтр по категориям</h5>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
              onClick={() => setSelectedCategory('all')}
            >
              Все блюда ({dishes.length})
            </button>
            
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.icon} {cat.name} ({categoryStats[cat.id] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Сетка блюд */}
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">🍽️ Меню</h5>
            <small className="text-muted">
              {filteredDishes.length === dishes.length 
                ? `Все блюда (${dishes.length})`
                : `Показано: ${filteredDishes.length} из ${dishes.length}`
              }
            </small>
          </div>
          <div>
            <span className="badge bg-secondary">
              💾 Сохранено локально
            </span>
          </div>
        </div>
        
        <div className="card-body">
          {filteredDishes.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-3">
                <span className="display-1 text-muted">🍽️</span>
              </div>
              <h5>Меню пусто</h5>
              <p className="text-muted">
                Добавьте первое блюдо используя форму выше!
              </p>
            </div>
          ) : (
            <div className="row row-cols-2 row-cols-md-4 g-3">
              {filteredDishes.map(dish => {
                const categoryIcon = categories.find(c => c.id === dish.category)?.icon || '🍽️';
                const categoryName = categories.find(c => c.id === dish.category)?.name || 'Блюдо';
                
                return (
                  <div key={dish.id} className="col">
                    <div className="card h-100 shadow-sm border hover-shadow">
                      {/* Изображение блюда */}
                      <div className="position-relative" style={{ paddingTop: '100%' }}>
                        <img 
                          src={dish.image_url} 
                          alt={dish.name}
                          className="position-absolute top-0 start-0 w-100 h-100"
                          style={{ 
                            objectFit: 'cover',
                            borderTopLeftRadius: '4px',
                            borderTopRightRadius: '4px'
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://via.placeholder.com/300/FF6B6B/FFFFFF?text=${encodeURIComponent(dish.name.substring(0, 10))}`;
                          }}
                        />
                        <div className="position-absolute top-0 start-0 bg-primary text-white px-2 py-1 small">
                          {categoryIcon} {categoryName}
                        </div>
                      </div>
                      
                      <div className="card-body p-2">
                        {/* Название блюда */}
                        <h6 className="card-title mb-1" style={{ fontSize: '0.9rem', lineHeight: '1.2' }}>
                          {dish.name}
                        </h6>
                        
                        {/* Описание */}
                        {dish.description && (
                          <p className="mb-1 small text-muted" style={{ fontSize: '0.8rem' }}>
                            {dish.description}
                          </p>
                        )}
                        
                        {/* Вес и цена */}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-muted">{dish.weight}</small>
                          <strong className="text-primary" style={{ fontSize: '0.95rem' }}>
                            {dish.price} ₽
                          </strong>
                        </div>
                        
                        {/* Кнопки */}
                        <div className="d-grid gap-1">
                          <button 
                            className="btn btn-primary btn-sm py-1"
                            onClick={() => addToCart(dish)}
                            style={{ fontSize: '0.8rem' }}
                          >
                            🛒 Добавить в корзину
                          </button>
                          
                          <div className="d-flex gap-1">
                            <button
                              className={`btn btn-outline-${dish.showDetails ? 'danger' : 'secondary'} btn-sm py-1 flex-grow-1`}
                              onClick={() => toggleDetails(dish.id)}
                              style={{ fontSize: '0.8rem' }}
                            >
                              {dish.showDetails ? '✖️ Скрыть состав' : '📋 Показать состав'}
                            </button>
                            
                            <button
                              onClick={() => deleteDish(dish.id, dish.name)}
                              className="btn btn-outline-danger btn-sm py-1"
                              title="Удалить блюдо"
                              style={{ fontSize: '0.8rem' }}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                        
                        {/* Детали состава */}
                        {dish.showDetails && dish.ingredients && (
                          <div className="mt-2 pt-2 border-top">
                            <p className="mb-1 small"><strong>Состав:</strong></p>
                            <p className="mb-0 small text-muted" style={{ fontSize: '0.75rem' }}>
                              {dish.ingredients}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Инструкция */}
      <div className="alert alert-success mt-4">
        <div className="d-flex align-items-center">
          <div className="me-3">
            <span className="fs-4">✅</span>
          </div>
          <div>
            <h5 className="alert-heading">Как пользоваться меню</h5>
            <p className="mb-2 small">
              1. <strong>Добавьте блюда</strong> через форму выше<br/>
              2. <strong>Выбирайте блюда</strong> и добавляйте в корзину<br/>
              3. <strong>Перейдите в корзину</strong> для оформления заказа<br/>
              4. <strong>Все данные сохраняются</strong> в вашем браузере
            </p>
            <div className="mt-2">
              <a href="/test-page2" className="btn btn-outline-success btn-sm">
                🛒 Перейти в корзину ({totalItems} позиций)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;