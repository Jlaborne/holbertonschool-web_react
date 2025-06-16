import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Notifications from './components/Notifications/Notifications';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import BodySection from './components/BodySection/BodySection';

import { login, logout } from './features/auth/authSlice';
import { fetchCourses } from './features/courses/coursesSlice';

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const courses = useSelector((state) => state.courses.courses);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCourses());
    }
  }, [isLoggedIn, dispatch]);

  const logIn = (email, password) => {
    dispatch(login({ email, password }));
  };

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <Notifications />
      <Header user={user} logOut={logOut} />
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
