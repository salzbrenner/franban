import React, { FC } from 'react';
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
} from 'redux/modules/auth';
import { connect } from 'react-redux';
import ButtonMain from 'components/ButtonMain/ButtonMain';
import './FormLogin.css';
import { Link } from 'react-router-dom';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  InjectedFormProps;

const FormLogin: FC<Props> = props => {
  const { handleSubmit, pristine, submitting } = props;

  const submit = (values: FormAuthValues) => {
    props.login(values);
  };

  const errorMessage = () => {
    if (props.errorMessage) {
      return (
        <div className="error">{props.errorMessage}</div>
      );
    }
  };

  return (
    <div className={'form-login'}>
      <h1>Please login</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div className={'form-login__fields'}>
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
      </form>
      <div className="form-login__register">
        <p>
          Don't have an account?{' '}
          <Link to={'/register'}>Sign up.</Link>
        </p>
      </div>
      <div className="form-login__error">
        {errorMessage()}
      </div>
    </div>
  );
};

function mapStateToProps(state: AuthState) {
  return {
    errorMessage: getErrorMessage(state),
  };
}

const mapDispatchToProps: any = {
  login,
};

const reduxFormLogin = reduxForm({
  form: 'login', // a unique identifier for this form
})(FormLogin);

export default connect(
  mapStateToProps,
  { login }
)(reduxFormLogin);
