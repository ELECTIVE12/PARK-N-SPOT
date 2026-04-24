import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { API_URL } from '../src/lib/api';

const canUseRealtimeSocket =
  typeof API_URL === 'string' &&
  (API_URL.startsWith('http://') || API_URL.startsWith('https://'));

export function useNotifications(token) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter((n) => !n.isRead).length);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  }, [token]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  useEffect(() => {
    if (!token || !canUseRealtimeSocket) return;
    const socket = io(API_URL, { auth: { token }, transports: ['websocket'] });
    socket.on('notification:new', (n) => {
      setNotifications((prev) => [n, ...prev]);
      setUnreadCount((c) => c + 1);
    });
    return () => socket.disconnect();
  }, [token]);

  const markAllRead = useCallback(async () => {
    try {
      await fetch(`${API_URL}/api/notifications/mark-all-read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all read:', err);
    }
  }, [token]);

  return { notifications, unreadCount, markAllRead, refetch: fetchNotifications };
}
