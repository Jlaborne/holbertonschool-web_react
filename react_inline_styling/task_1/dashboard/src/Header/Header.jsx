import React from "react";
import logo from "../assets/holberton-logo.jpg";
import { StyleSheet, css } from "aphrodite";

function Header() {
  return (
    <div className={css(styles.header)}>
      <img src={logo} alt="holberton logo" className={css(styles.logo)} />
      <h1 className={css(styles.title)}>School dashboard</h1>
    </div>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "3px solid #e1003c",
  },
  logo: {
    height: "200px",
  },
  title: {
    color: "#e1003c",
    marginLeft: "1rem",
  },
});

export default Header;
