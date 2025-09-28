import React, { useState } from 'react';
import NotificationList from './NotificationList';
import { useNotifications } from '../hooks/useNotifications';

export default function NotificationBell({ studentId }) {
  const { notifications, unreadCount } = useNotifications(studentId);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)}>
        🔔 {unreadCount > 0 && <span>({unreadCount})</span>}
      </button>
      {open && <NotificationList notifications={notifications} />}
    </div>
  );
}
