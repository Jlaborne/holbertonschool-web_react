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
