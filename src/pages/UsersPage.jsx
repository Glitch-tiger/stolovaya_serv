import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    pb.collection('users').getFullList()
      .then((records) => {
        setUsers(records);
      })
      .catch((error) => {
        console.error('Ошибка получения данных:', error);
      });
  }, []);

  return (
    <div>
      <h1>Список пользователей</h1>
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user.id}>
              {user.first_name} {user.last_name} (ID: {user.user_id})
            </li>
          ))
        ) : (
          <p>Пользователи не найдены</p>
        )}
      </ul>
    </div>
  );
};

export default UsersPage;
