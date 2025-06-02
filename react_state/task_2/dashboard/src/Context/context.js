import React from 'react';

const user = {
  email: '',
  password: '',
  isLoggedIn: false,
};

const logOut = () => {};

export const newContext = React.createContext({
  user,
  logOut: logOut,
});
