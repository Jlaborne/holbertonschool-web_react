import React from "react";
import PropTypes from "prop-types";
import CourseListRow from "./CourseListRow";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  courseList: {
    width: "100%",
    border: "1px solid #ccc",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    borderBottom: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
});

function CourseList({ courses = [] }) {
  return (
    <table className={css(styles.courseList)} id="CourseList">
      <thead>
        <CourseListRow isHeader={true} textFirstCell="Available courses" />
        <CourseListRow
          isHeader={true}
          textFirstCell="Course name"
          textSecondCell="Credit"
        />
      </thead>
      <tbody>
        {courses.length === 0 ? (
          <CourseListRow
            textFirstCell="No course available yet"
            isHeader={false}
          />
        ) : (
          courses.map((course) => (
            <CourseListRow
              key={course.id}
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
