import { memo } from 'react';

const NotificationItem = memo(function NotificationItem({
  type,
  value,
  markAsRead,
  id,
}) {
  console.log(
    `Rendering NotificationItem with id: ${id}, type: ${type}, value: ${value}`
  );

  const style = {
    color: type === 'urgent' ? 'red' : 'blue',
  };

  return (
    <li
      style={style}
      data-notification-type={type}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
});

export default NotificationItem;
