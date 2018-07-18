import React from 'react';
import PropTypes from 'prop-types';
import SvgRing from './SvgRing';

const Donut = (props) => {
  const { strokeWidth, percentage } = props;
  const children = React.Children.map(props.children, child =>
    React.cloneElement(child, {
      percentage,
    }),
  );

  return (
    <div style={{ position: 'relative', padding: `${strokeWidth}px` }}>
      <div
        style={{
          position: 'absolute',
          left: '0',
          right: '0',
          paddingLeft: 'inherit',
          paddingRight: 'inherit',
          height: `calc(100% - ${strokeWidth * 1.5}px)`,
        }}
      >
        {children}
      </div>
      <SvgRing fillPercent={percentage} strokeWidth={strokeWidth} />
    </div>
  );
};

Donut.propTypes = {
  strokeWidth: PropTypes.number,
  percentage: PropTypes.number,
  children: PropTypes.node,
};

export default Donut;
