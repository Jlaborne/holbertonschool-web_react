import React from 'react';

const user = {
  email: '',
  password: '',
  isLoggedIn: false,
};

const logOut = () => {};

const newContext = React.createContext({
  user,
  logOut: logOut,
});

export { newContext };
