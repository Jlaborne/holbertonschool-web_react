import React from "react";
import PropTypes from "prop-types";

class NotificationItem extends React.PureComponent {
  render() {
    const { id, type, value, html, markAsRead, notification } = this.props;

    const itemStyle = {
      cursor: "pointer",
      color: type === "urgent" ? "red" : "blue",
      fontSize: "20px",
      padding: "10px 8px",
      borderBottom: "1px solid black",
    };
    return (
      <li
        key={notification.id}
        onClick={() => this.markAsRead(notification.id)}
        style={{ cursor: "pointer" }}
      >
        {notification.value ? (
          notification.value
        ) : (
          <span dangerouslySetInnerHTML={notification.html} />
        )}
      </li>
    );
  }
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

export default NotificationItem;
