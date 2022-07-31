import React, { useEffect } from 'react';

import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { css, cx } from '@emotion/css';
import { useHistory } from 'react-router-dom';
import { useToast } from 'toast/toast-context';

import { useAuth } from 'auth/auth-context';
import { useQueryParams } from 'router/useDikastisRouting';

import DktButton from 'shared/DktButton';
import DktFormField from 'shared/form/DktFormField';
import FlexLayout from 'shared/FlexLayout';
import GeneralPage from 'shared/GeneralPage';

const signUpStyle = css`
  margin-top: 40px;
`;
const cancelStyle = css`
  margin: 20px 0 40px;
`;
const formStyle = css`
  display: flex;
  flex-direction: column;
`;
const fieldStyle = css`
  width: 100%;
`;
const containerStyle = css`
  margin-top: 120px;
  max-width: 500px;
`;

const validationSchema = yup.object().shape({
  displayName: yup.string()
    .min(8, 'Very short')
    .matches(
      /([A-Z][a-z]+\s)+([A-Z][a-z]+)/,
      'Please keep "Name Surname" pattern',
    )
    .required('Is required'),
  email: yup.string().email('Email invalid').required('Is required'),
  fullName: yup.string().min(10, 'Very short').required('Is required'),
  github: yup
    .string()
    .matches(
      /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/,
      'Invalid Github URL',
    )
    .required('Is required'),
  linkedin: yup
    .string()
    .matches(
      /^https?:\/\/((www|\w\w)\.)?linkedin.com\/((in\/[^/]+\/?)|(pub\/[^/]+\/((\w|\d)+\/?){3}))$/,
      'Invalid LinkedIn URL',
    )
    .required('Is required'),
});

function SignUpForm({ children }) {
  const { addToast } = useToast();
  const { register } = useAuth();
  const history = useHistory();
  const { email, name } = useQueryParams();

  return (
    <Formik
      initialValues={{
        displayName: '',
        email: email ?? '',
        fullName: name ?? '',
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/in/',
        skills: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => register(values, () => {
        addToast(200, 'User created, please login :D');
        history.push('/sign-in');
      })}
    >
      <Form className={cx(formStyle)}>{children}</Form>
    </Formik>
  );
}

export default function SignUp() {
  useEffect(() => { document.title = 'Sign Up'; }, []);

  return (
    <GeneralPage>
      <FlexLayout flexDirection="column" justifyContent="center" style={containerStyle}>
        <SignUpForm>
          <DktFormField fieldStyle={fieldStyle} name="fullName" placeholder="Your full name" title="Full Name" />
          <DktFormField fieldStyle={fieldStyle} name="displayName" placeholder="Name Surname" title="Preferred name" />
          <DktFormField fieldStyle={fieldStyle} name="email" placeholder="Your e-mail address" title="Email" type="email" />
          <DktFormField fieldStyle={fieldStyle} name="linkedin" placeholder="https://linkedin.com/in/username" title="Linkedin" />
          <DktFormField fieldStyle={fieldStyle} name="github" placeholder="https://github.com/username" title="Github" />
          <DktFormField fieldStyle={fieldStyle} name="skills" placeholder="Javascript, React, Java" title="Skills" />
          <FlexLayout alignItems="center" flexDirection="column" justifyContent="flex-end">
            <DktButton submit style={signUpStyle}>Send registration</DktButton>
            <DktButton negative href="/sign-in" style={cancelStyle}>Back</DktButton>
          </FlexLayout>
        </SignUpForm>
      </FlexLayout>
    </GeneralPage>
  );
}
