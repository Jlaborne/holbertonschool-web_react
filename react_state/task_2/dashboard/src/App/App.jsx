import React, { Component } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { getLatestNotification } from '../utils/utils';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
//import { StyleSheet, css } from "aphrodite";
import { newContext } from '../Context/context';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      logout: newContext._currentValue.logOut,
    };
  }

  handleDisplayDrawer = () => this.setState({ displayDrawer: true });
  handleHideDrawer = () => this.setState({ displayDrawer: false });

  handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'h') {
      alert('Logging you out');
      this.logOut();
    }
  };

  logIn = (email, password) => {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  };

  logOut = () => {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
    });
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { displayDrawer, user } = this.state;

    const contextValue = {
      user: this.state.user,
      logOut: this.logOut,
    };

    const coursesList = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];

    return (
      <newContext.Provider value={contextValue}>
        <>
          <div className="root-notifications">
            <Notifications
              notifications={notificationsList}
              displayDrawer={displayDrawer}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
            />
          </div>
          <Header />
          <div
          //className={css(styles.body)}
          >
            {this.state.user.isLoggedIn ? (
              <BodySectionWithMarginBottom>
                <CourseListWithLogging
                  title="Course List"
                  courses={coursesList}
                />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <LoginWithLogging
                  logIn={this.logIn}
                  email={user.email}
                  password={user.password}
                />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the School">
              <p>Holberton School News goes here</p>
            </BodySection>
          </div>
          <Footer
          //className={css(styles.footer)}
          >
            <p>Copyright 2025 - Holberton School</p>
          </Footer>
        </>
      </newContext.Provider>
    );
  }
}

/*const styles = StyleSheet.create({
  body: {
    padding: "40px",
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
});*/

export default App;
