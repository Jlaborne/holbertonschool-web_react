import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  item: {
    width: "auto",
    fontSize: "inherit",
    padding: "0",
    boxSizing: "border-box",
    "@media (max-width: 900px)": {
      width: "100%",
      fontSize: "20px",
      padding: "10px 8px",
      borderBottom: "1px solid black",
    },
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
    const style = type === "urgent" ? styles.urgent : styles.default;

    if (html) {
      return (
        <li
          className={css(style)}
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        />
      );
    }

    return (
      <li
        className={css(style)}
        data-notification-type={type}
        onClick={() => markAsRead(id)}
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
