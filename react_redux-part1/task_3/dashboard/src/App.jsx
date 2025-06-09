import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Notifications from './components/Notifications/Notifications';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import BodySection from './components/BodySection/BodySection';

import { fetchCourses } from './features/courses/coursesSlice';
import {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from './features/notifications/notificationsSlice';
import { login, logout } from './features/auth/authSlice';

export default function App() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const displayDrawer = useSelector(
    (state) => state.notifications.displayDrawer
  );
  const courses = useSelector((state) => state.courses.courses);
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCourses());
    }
  }, [dispatch, isLoggedIn]);

  const logIn = (email, password) => {
    dispatch(login({ email, password }));
  };

  const logOutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <Notifications
        notifications={notifications}
        displayDrawer={displayDrawer}
        handleDisplayDrawer={() => dispatch(showDrawer())}
        handleHideDrawer={() => dispatch(hideDrawer())}
        markNotificationAsRead={(id) => dispatch(markNotificationAsRead(id))}
      />
      <Header />
      {!isLoggedIn ? (
        <BodySectionWithMarginBottom title="Log in to continue">
          <Login login={logIn} />
        </BodySectionWithMarginBottom>
      ) : (
        <BodySectionWithMarginBottom title="Course list">
          <CourseList courses={courses} />
        </BodySectionWithMarginBottom>
      )}
      <BodySection title="News from the School">
        <p>Holberton School news goes here</p>
      </BodySection>
      <Footer user={user} />
    </>
  );
}
