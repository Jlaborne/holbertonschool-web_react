import React from 'react';
import BodySection from '../BodySection/BodySection';

export default function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div
      style={{ marginBottom: '40px' }}
      data-testid="body-section-with-margin"
    >
      <BodySection title={title}>{children}</BodySection>
    </div>
  );
}
