import { useState, useEffect, useMemo } from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { getLatestNotification } from '../utils/utils';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import { StyleSheet, css } from 'aphrodite';
import { newContext as NewContext } from '../Context/context';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoggedIn: false,
  });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ]);
  const [courses] = useState([
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ]);

  const handleDisplayDrawer = () => setDisplayDrawer(true);
  const handleHideDrawer = () => setDisplayDrawer(false);

  const logIn = (email, password) =>
    setUser({ email, password, isLoggedIn: true });
  const logOut = () => setUser({ email: '', password: '', isLoggedIn: false });

  const markNotificationAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'h') {
        alert('Logging you out');
        logOut();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const contextValue = useMemo(() => ({ user, logOut }), [user]);

  return (
    <NewContext.Provider value={contextValue}>
      <div className="root-notifications">
        <Notifications
          notifications={notifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />
      </div>
      <Header />
      <div className={css(styles.body)}>
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom>
            <CourseListWithLogging title="Course List" courses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <LoginWithLogging
              logIn={logIn}
              email={user.email}
              password={user.password}
            />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School News goes here</p>
        </BodySection>
      </div>
      <Footer />
    </NewContext.Provider>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: '40px',
    minHeight: '300px',
  },
});

export default App;
