import React from "react";
import CourseListRow from "./CourseListRow";
import PropTypes from "prop-types";
import "./CourseList.css";

function CourseList({ courses = [] }) {
  /*if (courses.length === 0) {
    return (
      <table id="CourseList">
        <tbody>
          <CourseListRow
            isHeader={true}
            textFirstCell="No course available yet"
          />
        </tbody>
      </table>
    );
  }

  return (
    <table id="CourseList">
      <thead>
        <CourseListRow isHeader={true} textFirstCell="Available courses" />
        <CourseListRow
          isHeader={true}
          textFirstCell="Course name"
          textSecondCell="Credit"
        />
      </thead>
      <tbody>
        {courses.map((course) => (
          <CourseListRow
            key={course.id}
            textFirstCell={course.name}
            textSecondCell={course.credit}
          />
        ))}
      </tbody>
    </table>
  );*/
  return (
    <table id="CourseList">
      {courses.length > 0 ? (
        <>
          <thead>
            <CourseListRow isHeader={true} textFirstCell="Available courses" />
            <CourseListRow
              isHeader={true}
              textFirstCell="Course name"
              textSecondCell="Credit"
            />
          </thead>
          <tbody>
            {courses.map((course) => (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
              />
            ))}
          </tbody>
        </>
      ) : (
        <tbody>
          <CourseListRow
            isHeader={false}
            textFirstCell="No course available yet"
          />
        </tbody>
      )}
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
