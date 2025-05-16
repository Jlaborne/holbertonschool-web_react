import React from "react";
import CourseListRow from "./CourseListRow";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

function CourseList({ courses = [] }) {
  return (
    <table className={css(styles.courseList)}>
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

const styles = StyleSheet.create({
  courseList: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    fontFamily: "Arial, sans-serif",
  },
});

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
