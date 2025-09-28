import { useState, useEffect } from 'react';
import { fetchNotifications } from '../notificationAPI';
import io from 'socket.io-client';

export function useNotifications(studentId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // fetch initial notifications
    fetchNotifications(studentId).then(res => setNotifications(res.data));

    // Realtime WebSocket
    const socket = io('http://localhost:3000', { query: { studentId } });
    socket.on('notification', (notif) => {
      setNotifications(prev => [notif, ...prev]);
    });

    return () => socket.disconnect();
  }, [studentId]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return { notifications, unreadCount, setNotifications };
}
