import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "aphrodite";

const styles = StyleSheet.create({
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
});

class NotificationItem extends React.PureComponent {
  render() {
    const { type, value, html, id, markAsRead } = this.props;
    //const style = type === "urgent" ? styles.urgent : styles.default;

    return (
      <li
        style={{ color: type === "default" ? "blue" : "red" }}
        data-notification-type={type}
        dangerouslySetInnerHTML={
          type === "urgent" && html !== undefined ? html : undefined
        }
        onClick={() => markAsRead(id)}
      >
        {type === "urgent" && html !== undefined ? null : value}
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
