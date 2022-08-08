import React from 'react';

import { css, cx } from '@emotion/css';

import { Path } from 'router/routing';

import DktButton from 'shared/DktButton';
import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

import designers from 'assets/designers.svg';
import developer from 'assets/developer.svg';
import visualDataPanel from 'assets/visual-data-panel.svg';

const containerStyle = css`
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
`;
const welcomeContainerStyle = css`
  @media(max-width: 400px) {
    flex-direction: column-reverse;
  }
`;
const vdpImageStyle = css`
  max-width: 500px;
`;
const sectionStyle = css`
  margin: 100px 0;
`;
const alignRightStyle = css`
  align-self: flex-end;
  text-align: end;
`;
const signUpStyle = css`
  margin: 32px 0;
`;
const signInStyle = css`
  margin-right: 12px;
`;

export default function Home() {
  return (
    <FlexLayout flexDirection="column" justifyContent="center" style={containerStyle}>
      <FlexLayout alignItems="center" style={welcomeContainerStyle}>
        <img alt="Project data panel" className={vdpImageStyle} src={visualDataPanel} />
        <div>
          <DktText holder="h2">Welcome!</DktText>
          <DktText holder="h4">
            Collaborate, build your portfolio and connect!
            Developers, designers or students, come and find
            the perfect project for you to develop your skills!
          </DktText>
          <FlexLayout justifyContent="center" style={signUpStyle}>
            <DktButton negative href={Path.SIGN_IN} style={signInStyle}>Sign In</DktButton>
            <DktButton href={Path.SIGN_UP}>Sign Up</DktButton>
          </FlexLayout>
        </div>
      </FlexLayout>
      <FlexLayout flexDirection="column" style={sectionStyle}>
        <DktText holder="h3">For developers</DktText>
        <DktText holder="h4">
          Find the perfect project that matches your skill set or
          that&apos;s using a new technology you want to learn more about.
        </DktText>
        <img alt="Developer using his laptop" className={cx(vdpImageStyle, alignRightStyle)} src={developer} />
      </FlexLayout>
      <FlexLayout alignItems="center" flexDirection="column" style={sectionStyle}>
        <DktText holder="h3" style={alignRightStyle}>For creators</DktText>
        <DktText holder="h4" style={alignRightStyle}>
          Submit your idea and find people interested in building it with you.
        </DktText>
        <img alt="Designing new idea" className={vdpImageStyle} src={designers} />
        <FlexLayout justifyContent="center">
          <DktButton href={Path.SIGN_UP}>Sign Up</DktButton>
        </FlexLayout>
      </FlexLayout>
    </FlexLayout>
  );
}
