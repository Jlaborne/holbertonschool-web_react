import React from "react";
import { StyleSheet, css } from "aphrodite";

function Login() {
  return (
    <div className={css(styles.login)}>
      <p>Login to access the full dashboard</p>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        className={css(styles.input)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        className={css(styles.input)}
      />
      <button type="button" className={css(styles.button)}>
        OK
      </button>
    </div>
  );
}

const styles = StyleSheet.create({
  login: {
    padding: "40px",
    minHeight: "300px",
    "@media (max-width: 900px)": {
      display: "block",
      padding: "10px",
    },
  },
  input: {
    display: "block",
    marginBottom: "10px",
    marginTop: "5px",
  },
  button: {
    display: "block",
    marginTop: "10px",
  },
});

export default Login;
