import PropTypes from 'prop-types';
import { memo } from 'react';
//import { StyleSheet } from "aphrodite";

function NotificationItem({ type, value, html, id, markAsRead }) {
  const style = { color: type === 'default' ? 'blue' : 'red' };
  //const style = type === "urgent" ? styles.urgent : styles.default;

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

/*const styles = StyleSheet.create({
  item: {
    width: "100%",
    fontSize: "20px",
    padding: "10px 8px",
    borderBottom: "1px solid black",
    boxSizing: "border-box",
  },
  default: {
    color: "blue",
  },
  urgent: {
    color: "red",
  },
});*/

export default memo(NotificationItem);
