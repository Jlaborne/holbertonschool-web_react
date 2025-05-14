import React from "react";
import PropTypes from "prop-types";

class NotificationItem extends React.Component {
  render() {
    const { type, value, html } = this.props;

    if (html) {
      return (
        <li
          data-notification-type={type}
          style={{ color: type === "urgent" ? "red" : "blue" }}
          dangerouslySetInnerHTML={html}
          onClick={() => this.props.markAsRead(this.props.id)}
        ></li>
      );
    }

    return (
      <li
        data-notification-type={type}
        style={{ color: type === "urgent" ? "red" : "blue" }}
        onClick={() => this.props.markAsRead(this.props.id)}
      >
        {value}
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
