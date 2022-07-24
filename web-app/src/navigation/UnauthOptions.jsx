import React from 'react';

import { Link } from 'react-router-dom';

import DktText from 'shared/DktText';

export default function UnauthOptions({ itemsStyle }) {
  return (
    <DktText holder="h3" style={itemsStyle}>
      <Link to="/sign-in">Sign In</Link>
    </DktText>
  );
}
