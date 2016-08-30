import React from 'react';
import classNames from 'classnames';

const Icon = props => {
  const cNames = classNames(
    'fa', 'fa-fw', {
      [`fa-${props.name}`]: true,
    }
  );
  return props.name ? <span className={cNames}></span> : null;
};
Icon.propTypes = {
  name: React.PropTypes.string,
};

export default Icon;
