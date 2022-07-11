import React from 'react';

import Loader from 'react-loader-spinner';

import approvedCircleIcon from 'assets/status-icons/approved-circle.svg';
import clockCircle from 'assets/status-icons/clock-circle.svg';
import redXCircle from 'assets/status-icons/red-x-circle.svg';
import yellowExclamaitonIcon from 'assets/status-icons/yellow-exclamation.svg';

const warnCircle = <img alt="Warn circle" height="68px" src={yellowExclamaitonIcon} width="68px" />;
const successCircle = <img alt="Success circle" height="68px" src={approvedCircleIcon} width="68px" />;
const failureCircle = <img alt="Failure circle" height="68px" src={redXCircle} width="68px" />;
const timeLimitCircle = <img alt="Clock circle" height="68px" src={clockCircle} width="68px" />;

export default {
  200: {
    description: 'Successfully sent :D',
    icon: successCircle,
    title: 'Okay!',
  },
  400: {
    description: 'Invalid input :/',
    icon: warnCircle,
    title: 'Oops',
  },
  401: {
    description: 'Wrong credentials ;-;',
    icon: failureCircle,
    title: 'You mean it?',
  },
  403: {
    description: 'You can\'t do that :/',
    icon: warnCircle,
    title: 'Blocked',
  },
  404: {
    description: 'We couldn\'t find that :/',
    icon: warnCircle,
    title: 'Where is??',
  },
  409: {
    description: 'This is duplicated or taken :o',
    icon: warnCircle,
    title: 'Wait!',
  },
  500: {
    description: 'Something very bad happend :(',
    icon: failureCircle,
    title: '"Mamain min ajudin"',
  },
  502: {
    description: 'Better call the devs :(',
    icon: failureCircle,
    title: '"Mamain min ajudin"',
  },
  ACCEPTED: {
    description: 'Nice job!',
    icon: successCircle,
    title: 'Submission accepted',
  },
  COMPILATION_ERROR: {
    description: 'Compilation error :(',
    icon: warnCircle,
    title: 'Submission failed',
  },
  FINISHED: {
    description: 'Nice job!',
    icon: successCircle,
    title: 'Done!',
  },
  JUDGING: {
    description: 'Just a sec... I swear!',
    icon: <Loader
      color="#EEBF4D"
      height={100}
      type="Rings"
      width={100}
    />,
    title: 'Judging submission',
  },
  RUNNING: {
    description: 'Just a sec... I swear!',
    icon: <Loader
      color="#EEBF4D"
      height={100}
      type="Rings"
      width={100}
    />,
    title: 'Running submission',
  },
  RUNTIME_ERROR: {
    description: 'Runtime error :(',
    icon: warnCircle,
    title: 'Submission failed',
  },
  TIME_LIMIT_EXCEPTION: {
    description: 'Took too long :o',
    icon: timeLimitCircle,
    title: 'Submission failed',
  },
  TOKEN: {
    description: 'Please log back in.',
    icon: warnCircle,
    title: 'Login expired!',
  },
  WRONG_ANSWER: {
    description: 'Wrong answer :(',
    icon: failureCircle,
    title: 'Submission failed',
  },
};
