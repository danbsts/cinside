import React from 'react';

import { Link } from 'react-router-dom';

import { Path } from 'router/routing';

import DktText from 'shared/DktText';

export default function AuthOptions({ itemsStyle }) {
  return (
    <>
      <DktText holder="h3" style={itemsStyle}>
        <Link to={Path.PROFILE}>Profile</Link>
      </DktText>
      <DktText holder="h3" style={itemsStyle}>
        <Link to="/api/logout">Logout</Link>
      </DktText>
    </>
  );
}
