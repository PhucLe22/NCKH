import React from 'react';
import { markAsRead } from '../notificationAPI';

export default function NotificationList({ notifications }) {
  const handleClick = async (id) => {
    await markAsRead(id);
  };

  return (
    <ul
      style={{
        position: 'absolute',
        top: '30px',
        right: 0,
        background: '#fff',
        border: '1px solid #ccc',
        width: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      {notifications.map((n) => (
        <li
          key={n.id}
          style={{
            padding: '8px',
            background: n.isRead ? '#f9f9f9' : '#e6f7ff',
            cursor: 'pointer',
          }}
          onClick={() => handleClick(n.id)}
        >
          <b>{n.title}</b>
          <p>{n.content}</p>
          <small>{new Date(n.createdAt).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
}
