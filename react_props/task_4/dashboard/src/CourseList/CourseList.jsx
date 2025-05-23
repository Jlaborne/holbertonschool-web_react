import React from "react";
import CourseListRow from "./CourseListRow";
import PropTypes from "prop-types";
import "./CourseList.css";

function CourseList({ courses = [] }) {
  const isEmpty = courses.length === 0;

  return (
    <table id="CourseList">
      {!isEmpty && (
        <thead>
          <CourseListRow
            isHeader={true}
            textFirstCell="Available courses"
            textSecondCell={null}
          />
          <CourseListRow
            isHeader={true}
            textFirstCell="Course name"
            textSecondCell="Credit"
          />
        </thead>
      )}
      <tbody>
        {isEmpty ? (
          <CourseListRow
            isHeader={false}
            textFirstCell="No course available yet"
            textSecondCell={null}
          />
        ) : (
          courses.map((course) => (
            <CourseListRow
              key={course.id}
              isHeader={false}
              textFirstCell={course.name}
              textSecondCell={course.credit}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      credit: PropTypes.number,
    })
  ),
};

export default CourseList;
