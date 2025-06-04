import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import { newContext } from '../Context/context';

class Header extends React.Component {
  static contextType = newContext;

  render() {
    const { user, logOut } = this.context;

    return (
      <div>
        <div
        // className={css(styles.header)}
        >
          <img
            src={logo}
            alt="holberton logo"
            // className={css(styles.logo)}
          />
          <h1
          // className={css(styles.title)}
          >
            School dashboard
          </h1>
        </div>

        {user.isLoggedIn && (
          <div id="logoutSection">
            Welcome {user.email}{' '}
            <a href="#" onClick={logOut}>
              (logout)
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
