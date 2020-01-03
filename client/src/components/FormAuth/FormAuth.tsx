import React, { FormEvent } from 'react';
import { Field } from 'redux-form';
import ButtonMain from 'components/ButtonMain/ButtonMain';
import './FormAuth.css';

type FormAuthProps = {
  submitHandler: (event: FormEvent) => {};
  pristine: boolean;
  submitting: boolean;
  errorMessage: string;
};

const FormAuth = ({
  submitHandler,
  pristine,
  submitting,
  errorMessage,
}: FormAuthProps) => {
  const errorRenderer = () => {
    if (errorMessage) {
      return <div className="error">{errorMessage}</div>;
    }
  };

  return (
    <form
      className={`form-auth`}
      onSubmit={submitHandler}
      autoComplete={'off'}
    >
      <div className={'form-auth__fields'}>
        <Field
          name="email"
          component="input"
          type="email"
          placeholder="Email"
        />
        <Field
          name="password"
          component="input"
          type="password"
          placeholder="Password"
        />
      </div>
      <div>
        <ButtonMain
          text={'Login'}
          type="submit"
          secondary={true}
          disabled={pristine || submitting}
        />
      </div>
      <div className="form-auth__error">
        {errorRenderer()}
      </div>
    </form>
  );
};

export default FormAuth;
