import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

class BodySection extends React.Component {
  render() {
    return (
      <div className="bodySection">
        <h2>{this.props.title}</h2>
        {this.props.children}
      </div>
    );
  }
}

BodySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BodySection;
