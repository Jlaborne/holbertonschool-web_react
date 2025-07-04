import React from "react";
import { StyleSheet, css } from "aphrodite";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      enableSubmit: false,
    };
  }

  handleChangeEmail = (e) => {
    const email = e.target.value;
    this.setState({ email }, this.updateSubmitState);
  };

  handleChangePassword = (e) => {
    const password = e.target.value;
    this.setState({ password }, this.updateSubmitState);
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoggedIn: true });
  };

  updateSubmitState = () => {
    const { email, password } = this.state;
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = password.length >= 8;

    this.setState({
      enableSubmit:
        email !== "" && password !== "" && isValidEmail && isValidPassword,
    });
  };

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className={css(styles.login)}>
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            className={css(styles.input)}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            className={css(styles.input)}
            onChange={this.handleChangePassword}
          />
          <input type="submit" className={css(styles.button)}>
            OK
          </input>
        </form>
      </div>
    );
  }
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
