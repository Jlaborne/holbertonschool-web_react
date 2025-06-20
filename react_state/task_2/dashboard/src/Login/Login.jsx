import React from 'react';
//import { StyleSheet, css } from 'aphrodite';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleChangeEmail(e) {
    const email = e.target.value;
    this.setState({ email }, this.updateSubmitState);
  }

  handleChangePassword(e) {
    const password = e.target.value;
    this.setState({ password }, this.updateSubmitState);
  }

  handleLoginSubmit(e) {
    e.preventDefault();

    const { email, password, enableSubmit } = this.state;

    if (enableSubmit && this.props.logIn) {
      this.props.logIn(email, password);
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPassword(password) {
    return password.length >= 8;
  }

  updateSubmitState() {
    const { email, password } = this.state;
    const enableSubmit =
      email !== '' &&
      password !== '' &&
      this.isValidEmail(email) &&
      this.isValidPassword(password);
    this.setState({ enableSubmit });
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div
      //className={css(styles.login)}
      >
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            //className={css(styles.input)}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            //className={css(styles.input)}
            onChange={this.handleChangePassword}
          />
          <input
            type="submit"
            //className={css(styles.button)}
            disabled={!enableSubmit}
            value="OK"
          />
        </form>
      </div>
    );
  }
}

Login.defaultProps = {
  logIn: () => {},
};

/*const styles = StyleSheet.create({
  login: {
    padding: '40px',
    minHeight: '300px',
    '@media (max-width: 900px)': {
      display: 'block',
      padding: '10px',
    },
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    marginTop: '5px',
  },
  button: {
    display: 'block',
    marginTop: '10px',
  },
});*/

export default Login;
