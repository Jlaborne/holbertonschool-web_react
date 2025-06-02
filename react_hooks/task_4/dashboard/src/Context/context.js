import { createContext } from 'react';

const user = {
  email: '',
  password: '',
  isLoggedIn: false,
};

const logOut = () => {};

const newContext = createContext({
  user: user,
  logOut: logOut,
});

export { newContext, user, logOut };
