import React from "react";
import { StyleSheet, css } from "aphrodite";

function Login() {
  return (
    <div className={css(styles.body)}>
      <p>Login to access the full dashboard</p>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />
      <button type="button">OK</button>
    </div>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    minHeight: "300px",
  },
});

export default Login;
