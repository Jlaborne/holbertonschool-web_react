import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import BodySection from '../BodySection/BodySection';

export default function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div
      className={css(styles.marginBottom)}
      data-testid="body-section-with-margin"
    >
      <BodySection title={title}>{children}</BodySection>
    </div>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 40,
  },
});
