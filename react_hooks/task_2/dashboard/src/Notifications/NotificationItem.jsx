import PropTypes from 'prop-types';
import { memo } from 'react';
// import { StyleSheet, css } from "aphrodite";

function NotificationItem({ type, value, html, id, markAsRead }) {
  const style = { color: type === 'default' ? 'blue' : 'red' };

  return (
    <li
      style={style}
      data-notification-type={type}
      dangerouslySetInnerHTML={html && type === 'urgent' ? html : undefined}
      onClick={() => markAsRead(id)}
    >
      {html && type === 'urgent' ? null : value}
    </li>
  );
}

NotificationItem.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  markAsRead: () => {},
};

export default memo(NotificationItem);
