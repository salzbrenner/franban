import React, { FC } from 'react';
import {
  Field,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import {
  register,
  getErrorMessage,
  AuthState,
  resetPassword,
  resetPasswordMessage,
} from 'redux/modules/auth';
import { connect } from 'react-redux';
import ButtonMain from 'components/ButtonMain/ButtonMain';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  InjectedFormProps;

const FormPasswordResetRequest: FC<Props> = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    resetMessage,
    resetPassword,
    submitSucceeded,
  } = props;

  const submit = (values: {}) => {
    resetPassword(values);
  };

  const renderForm = () => {
    return (
      <div className={`form-register`}>
        <h1>Reset Password</h1>
        <p>
          Enter your email and you we will send you a link
          to update your password
        </p>
        <form
          className={`form-auth`}
          onSubmit={handleSubmit(submit)}
        >
          <div className={'form-auth__fields'}>
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="Email"
            />
          </div>
          <div>
            <ButtonMain
              text={'Reset Password'}
              type="submit"
              secondary={true}
              disabled={pristine || submitting}
            />
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      {!submitSucceeded ? (
        renderForm()
      ) : (
        <div>
          Thank you, we will send an email to reset your
          password
        </div>
      )}
    </>
  );
};

function mapStateToProps(state: AuthState) {
  return {
    resetMessage: resetPasswordMessage(state),
  };
}

const mapDispatchToProps: any = {
  resetPassword,
};

const reduxFormRegister = reduxForm({
  form: 'password-reset-request', // a unique identifier for this form
})(FormPasswordResetRequest);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormRegister);
