import React from "react";
import PropTypes from "prop-types";

function CourseListRow({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr>
          <th colSpan="2" style={{ textAlign: "center" }}>
            {textFirstCell}
          </th>
        </tr>
      );
    }
    return (
      <tr>
        <th style={{ width: "70%" }}>{textFirstCell}</th>
        <th>{textSecondCell}</th>
      </tr>
    );
  }

  if (textSecondCell === null) {
    return (
      <tr>
        <td colSpan="2" style={{ textAlign: "center", fontWeight: "bold" }}>
          {textFirstCell}
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{textFirstCell}</td>
      <td>{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CourseListRow;
