import React from "react";
import PropTypes from "prop-types";
import BodySection from "./BodySection";
import "./BodySectionWithMarginBottom.css";

class BodySectionWithMarginBottom extends React.Component {
  render() {
    return (
      <div className="bodySectionWithMargin">
        <BodySection>{this.props.title}</BodySection>
        {this.props.children}
      </div>
    );
  }
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BodySectionWithMarginBottom;
