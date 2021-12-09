import React, { FC, useEffect, useState } from 'react';
import {
  Field,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import {
  login,
  getErrorMessage,
  FormAuthValues,
  AuthState,
  clearErrors,
} from 'redux/modules/auth';
import { connect } from 'react-redux';
import ButtonMain from 'components/ButtonMain/ButtonMain';
import './FormLogin.css';
import { Link } from 'react-router-dom';
import FormAuth from 'components/FormAuth/FormAuth';
import { AppState } from 'redux/modules/rootReducer';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  InjectedFormProps;

const FormLogin: FC<Props> = props => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    pristine,
    submitting,
    errorMessage,
    clearErrors,
    login,
  } = props;

  const submit = async (values: FormAuthValues) => {
    setLoading(true);
    await login(values);
  };

  useEffect(() => {
    clearErrors();
  }, []);

  useEffect(() => {
    if (errorMessage) setLoading(false);
  }, [errorMessage]);

  return (
    <div className={'form-login'}>
      <h1>Please login</h1>
      <FormAuth
        submitHandler={handleSubmit(submit)}
        pristine={pristine}
        submitting={submitting}
        errorMessage={errorMessage}
        loading={loading}
      />
      <p className={'font-weight-bold'}> - or - </p>
      <div className="form-login__demo">
        <ButtonMain
          text={'Check out the demo'}
          type="submit"
          secondary={false}
          onClick={() =>
            submit({
              email: 'demo@franban.com',
              password: 'root',
            })
          }
        />
      </div>
      {loading && (
        <>
          <div className="lds-ring">
            <div />
            <div />
            <div />
            <div />
          </div>
          <span>Waiting for Heroku...</span>
        </>
      )}
      <div className="form-login__register">
        <p>
          Forgot your password?{' '}
          <Link to={'/reset-password'}>Reset it.</Link>
        </p>
        <p>
          Don't have an account?{' '}
          <Link to={'/register'}>Sign up.</Link>
        </p>
      </div>
    </div>
  );
};

function mapStateToProps({ auth }: AppState) {
  return {
    errorMessage: getErrorMessage(auth),
  };
}

const mapDispatchToProps: any = {
  login,
  clearErrors,
};

const reduxFormLogin = reduxForm({
  form: 'login', // a unique identifier for this form
})(FormLogin);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormLogin);
