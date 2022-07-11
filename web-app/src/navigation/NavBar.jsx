import React, { useState } from 'react';

import { css, cx } from '@emotion/css';

import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

const barStyle = css`
  width: 40px;
  height: 8px;
  background-color: #EEE;
`;
const barSpacingStyle = css`
  margin-bottom: 4px;
`;
const navStyle = css`
  position: absolute;
  margin-left: 20px;
`;
const activeContainerStyle = css`
  padding: 30px 20px;
  position: fixed;
  top: 0;
  left: 0;
  background: #1C1C1C;
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.25);
  height: 100%;
`;
const menuOptionsContainerStyle = css`
  margin-top: 32px;
  margin-right: 32px;
`;
const menuStyle = css`
  :hover {
    cursor: pointer;
  }
`;
const menuItemsSpaceStyle = css`
  margin-bottom: 12px;
`;

function NavMenu({ setActive, value }) {
  return (
    <div className={menuStyle} role="presentation" onClick={() => setActive(value)}>
      <div className={cx(barStyle, barSpacingStyle)} />
      <div className={cx(barStyle, barSpacingStyle)} />
      <div className={barStyle} />
    </div>
  );
}

function ActiveNav({ setActive }) {
  return (
    <div className={activeContainerStyle}>
      <NavMenu setActive={setActive} />
      <FlexLayout flexDirection="column" style={menuOptionsContainerStyle}>
        <DktText holder="h3" style={menuItemsSpaceStyle}>All projects</DktText>
        <DktText holder="h3" style={menuItemsSpaceStyle}>Profile</DktText>
      </FlexLayout>
    </div>
  );
}

export default function Navbar() {
  const [active, setActive] = useState(false);

  return (
    <nav className={navStyle}>
      {active ? <ActiveNav setActive={setActive} /> : <NavMenu value setActive={setActive} />}
    </nav>
  );
}
