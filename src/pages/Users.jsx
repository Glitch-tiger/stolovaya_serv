import React, { useState, useEffect } from 'react';
import pb from '../../pb'; 

function Users() {

  const pb = new PocketBase('http://127.0.0.1:8090');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    class: '5а',
    student_id: ''
  });

  const classOptions = [
    '5а', '5б', '5в', '5г',
    '6а', '6б', '6в',
    '7а', '7б', '7в',
    '8а', '8б',
    '9а', '9б',
    '10', '11'
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const records = await pb.collection('users').getFullList({
        sort: 'class,last_name',
      });
      setUsers(records);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не могу подключиться к базе данных!');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const studentId = parseInt(newUser.student_id);
      if (isNaN(studentId)) {
        alert('ID должен быть числом!');
        return;
      }

      await pb.collection('users').create({
        ...newUser,
        student_id: studentId.toString()
      });
      alert('Ученик добавлен!');
      
      setNewUser({
        first_name: '',
        last_name: '',
        class: '5а',
        student_id: ''
      });
      
      loadUsers();
    } catch (error) {
      alert('Ошибка: ' + error.message);
    }
  };

  const deleteUser = async (id, name) => {
    if (window.confirm(`Удалить ученика ${name}?`)) {
      try {
        await pb.collection('users').delete(id);
        loadUsers();
        alert('Ученик удален');
      } catch (error) {
        alert('Ошибка удаления: ' + error.message);
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = search === '' || 
      user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      (user.student_id && user.student_id.toString().includes(search));
    
    const matchesClass = selectedClass === 'all' || user.class === selectedClass;
    
    return matchesSearch && matchesClass;
  });

  const classStats = {};
  users.forEach(user => {
    if (user.class) {
      classStats[user.class] = (classStats[user.class] || 0) + 1;
    }
  });

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
        <p className="mt-2">Загрузка данных учеников...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Заголовок */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">🎓 Ученики школы</h1>
        <div>
          <a 
            href="http://127.0.0.1:8090/_/" 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-outline-primary btn-sm me-2"
          >
            📊 Админка
          </a>
          <button
            onClick={loadUsers}
            className="btn btn-outline-secondary btn-sm"
          >
            🔄 Обновить
          </button>
        </div>
      </div>

      {/* Информация */}
      <div className="card bg-primary text-white mb-4">
        <div className="card-body">
          <h5 className="card-title">Школьная база данных</h5>
          <p className="card-text mb-0">
            Всего учеников: <strong>{users.length}</strong> | 
            База: <strong>users</strong>
          </p>
        </div>
      </div>

      {/* Форма добавления */}
      <div className="card mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">➕ Добавить нового ученика</h5>
        </div>
        <div className="card-body">
          <form onSubmit={addUser}>
            <div className="row g-3 mb-3">
<div className="col-md-3">
                <label className="form-label">Имя *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Иван"
                  value={newUser.first_name}
                  onChange={(e) => setNewUser({...newUser, first_name: e.target.value})}
                  required
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label">Фамилия *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Петров"
                  value={newUser.last_name}
                  onChange={(e) => setNewUser({...newUser, last_name: e.target.value})}
                  required
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label">Класс *</label>
                <select
                  className="form-select"
                  value={newUser.class}
                  onChange={(e) => setNewUser({...newUser, class: e.target.value})}
                >
                  {classOptions.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-3">
                <label className="form-label">ID номер * (цифры)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="123"
                  value={newUser.student_id}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setNewUser({...newUser, student_id: value});
                  }}
                  required
                  pattern="\d+"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="btn btn-success w-100"
            >
              📝 Добавить ученика
            </button>
          </form>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">🔍 Поиск по имени, фамилии или ID:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Введите для поиска..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">🏫 Фильтр по классу:</label>
              <select
                className="form-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="all">Все классы</option>
                {classOptions.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Статистика */}
      {Object.keys(classStats).length > 0 && (
        <div className="mb-4">
          <p className="mb-2"><strong>📊 По классам:</strong></p>
          <div className="d-flex flex-wrap gap-2">
            {Object.entries(classStats).map(([cls, count]) => (
              <span 
                key={cls} 
                className={`badge ${selectedClass === cls ? 'bg-primary' : 'bg-secondary'} p-2`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedClass(cls === selectedClass ? 'all' : cls)}
                title={`Показать только ${cls} класс`}
              >
                {cls}: {count}
              </span>
            ))}
          </div>
        </div>
      )}

      {/*

> Код:
Список учеников */}
      <div className="card">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📋 Список учеников ({filteredUsers.length} из {users.length})</h5>
          <span className="text-muted">
            {filteredUsers.length === users.length ? 'Показаны все' : `Отфильтровано: ${filteredUsers.length}`}
          </span>
        </div>
        <div className="card-body">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">🙁 Ничего не найдено</p>
              <p className="text-muted">Попробуйте изменить поиск или фильтр</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Класс</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <code className="bg-light p-1 rounded">
                          {user.student_id || '—'}
                        </code>
                      </td>
                      <td className="fw-bold">{user.last_name || '—'}</td>
                      <td>{user.first_name || '—'}</td>
                      <td>
                        <span className={`badge ${user.class === '10' || user.class === '11' ? 'bg-danger' : 'bg-primary'}`}>
                          {user.class || '—'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteUser(user.id, `${user.first_name} ${user.last_name}`)}
                          className="btn btn-danger btn-sm"
                        >
                          🗑️ Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Подсказка */}
      <div className="alert alert-info mt-4">
        <strong>💡 Подсказка:</strong>
        <ul className="mb-0 mt-2">
          <li>Все изменения сохраняются в базе данных PocketBase в коллекции "users"</li>
          <li>ID должен содержать только цифры (например: 123, 456, 789)</li>
        </ul>
      </div>
    </div>
  );
}

export default Users;
