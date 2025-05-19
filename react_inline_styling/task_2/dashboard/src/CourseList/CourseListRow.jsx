import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: "#deb5b545",
  },
  dataRow: {
    backgroundColor: "#f5f5f5ab",
  },
  th: {
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    padding: "0.5em",
  },
  td: {
    padding: "0.5em",
  },
});

function CourseListRow({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) {
  const rowStyle = isHeader ? styles.headerRow : styles.dataRow;

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className={css(rowStyle)}>
          <th colSpan="2" className={css(styles.th)}>
            {textFirstCell}
          </th>
        </tr>
      );
    } else {
      return (
        <tr className={css(rowStyle)}>
          <th className={css(styles.th)}>{textFirstCell}</th>
          <th className={css(styles.th)}>{textSecondCell}</th>
        </tr>
      );
    }
  }

  return (
    <tr className={css(rowStyle)}>
      <td className={css(styles.td)}>{textFirstCell}</td>
      <td className={css(styles.td)}>{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CourseListRow;
