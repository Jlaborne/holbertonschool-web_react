import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import BodySection from '../BodySection/BodySection';

export default function BodySectionWithMarginBottom(props) {
  return (
    <div
      style={{ marginBottom: '40px' }}
      data-testid="body-section-with-margin"
    >
      <BodySection {...props} />
    </div>
  );
}

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: '40px',
  },
});
