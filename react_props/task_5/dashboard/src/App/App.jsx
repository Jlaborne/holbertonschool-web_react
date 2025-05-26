import "./App.css";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import { getLatestNotification } from "../utils/utils";
import CourseList from "../CourseList/CourseList";
import PropTypes from "prop-types";

function App({ isLoggedIn = false }) {
  const coursesList = [
    { id: 1, name: "ES6", credit: "60" },
    { id: 2, name: "Webpack", credit: "20" },
    { id: 3, name: "React", credit: "40" },
  ];

  const notificationsList = [
    {
      id: Math.floor(Math.random() * Date.now()),
      type: "default",
      value: "New course available",
    },
    {
      id: Math.floor(Math.random() * Date.now()),
      type: "urgent",
      value: "New resume available",
    },
    {
      id: Math.floor(Math.random() * Date.now()),
      type: "urgent",
      html: { __html: getLatestNotification() },
    },
  ];

  return (
    <>
      <div className="root-notifications">
        <Notifications notifications={notificationsList} />
      </div>
      <Header />
      {isLoggedIn ? <CourseList courses={coursesList} /> : <Login />}
      <Footer />
    </>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default App;
