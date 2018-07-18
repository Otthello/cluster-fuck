import React from 'react';
import PropTypes from 'prop-types';
import DonutRing from '../atoms/DonutRing';

const flexboxCentering = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

/* NOTE: If you make the inner piece anymore complicated make a new component */
const PercentageDonut = (props) => {
  const { innerStyle, ringStyle, ringWidth, percentage } = props;
  return (
    <DonutRing strokeWidth={ringWidth} style={ringStyle} percentage={percentage}>
      <div style={Object.assign({}, flexboxCentering, innerStyle)}>{`${props.percentage}%`}</div>
    </DonutRing>
  );
};

PercentageDonut.propTypes = {
  innerStyle: PropTypes.object,
  ringStyle: PropTypes.object,
  ringWidth: PropTypes.number,
  percentage: PropTypes.number,
};

PercentageDonut.defaultProps = {
  ringWidth: 20,
};

export default PercentageDonut;
