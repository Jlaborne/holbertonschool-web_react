import React, { Component } from "react";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import { getLatestNotification } from "../utils/utils";
import CourseList from "../CourseList/CourseList";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import WithLogging from "../HOC/WithLogging";
import { StyleSheet, css } from "aphrodite"; // 👈 Aphrodite import

class App extends Component {
  static defaultProps = {
    logOut: () => {},
    isLoggedIn: false,
  };

  handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "h") {
      alert("Logging you out");
      this.props.logOut();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { isLoggedIn } = this.props;

    const coursesList = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 },
    ];

    const notificationsList = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
    ];

    const LoginWithLogging = WithLogging(Login);
    const CourseListWithLogging = WithLogging(CourseList);

    return (
      <>
        <div className="root-notifications">
          <Notifications notifications={notificationsList} />
        </div>
        <Header />
        <div className={css(styles.body)}>
          {" "}
          {/* 👈 body style */}
          {isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={coursesList} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <LoginWithLogging />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
        </div>
        <footer className={css(styles.footer)}>
          {" "}
          {/* 👈 footer style */}
          <p>Copyright 2025 - Holberton School</p>
        </footer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    minHeight: "300px",
  },
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    borderTop: "3px solid #e1003c",
    textAlign: "center",
    padding: "1rem 0",
  },
});

export default App;
