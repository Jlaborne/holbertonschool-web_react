import React from 'react';
import { css } from 'aphrodite';

function CourseListRow({
  isHeader,
  textFirstCell,
  textSecondCell,
  style,
  id,
  isChecked,
  onChangeRow = () => {},
}) {
  if (isHeader) {
    if (textSecondCell === null || textSecondCell === undefined) {
      return (
        <tr>
          <th className={css(style)} colSpan="2">
            {textFirstCell}
          </th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th className={css(style)}>{textFirstCell}</th>
          <th className={css(style)}>{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr>
        <td>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onChangeRow(id, e.target.checked)}
          />
          {textFirstCell}
        </td>
        <td>{textSecondCell}</td>
      </tr>
    );
  }
}

export default CourseListRow;
