import React from 'react';
import emptyIllustration from './empty-discussions.png';

const Empty = () => (
  <img
    className="ds-empty-ico"
    src={emptyIllustration}
    alt=""
    aria-hidden="true"
  />
);

export default Empty;
