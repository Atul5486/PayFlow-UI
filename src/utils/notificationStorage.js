const getNotificationKey = (notification) => {
  if (!notification) return null;

  if (notification.id !== undefined && notification.id !== null) {
    return String(notification.id);
  }

  const sentAt = notification.sentAt || notification.createdAt || '';
  const message = notification.message || '';
  return `${sentAt}::${message}`;
};

const getStorageKey = (userId) => `payflow-read-notifications:${userId}`;

const readStoredKeys = (userId) => {
  if (!userId || typeof window === 'undefined') {
    return new Set();
  }

  try {
    const storedValue = localStorage.getItem(getStorageKey(userId));
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    return new Set(Array.isArray(parsedValue) ? parsedValue : []);
  } catch (error) {
    return new Set();
  }
};

const saveStoredKeys = (userId, keys) => {
  if (!userId || typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(Array.from(keys)));
  } catch (error) {
    // Ignore storage failures and fall back to the in-memory list.
  }
};

export const filterUnreadNotifications = (notifications, userId) => {
  const readKeys = readStoredKeys(userId);
  const seenKeys = new Set();

  return (notifications || []).filter((notification) => {
    const key = getNotificationKey(notification);

    if (!key) {
      return true;
    }

    if (readKeys.has(key) || seenKeys.has(key)) {
      return false;
    }

    seenKeys.add(key);
    return true;
  });
};

export const markNotificationsAsRead = (userId, notifications) => {
  const readKeys = readStoredKeys(userId);

  (notifications || []).forEach((notification) => {
    const key = getNotificationKey(notification);
    if (key) {
      readKeys.add(key);
    }
  });

  saveStoredKeys(userId, readKeys);
};
