import React, { FC, useEffect } from 'react';
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
import { confirmToken } from 'services/api';

interface OwnProps {
  token?: string;
  uid?: string | null;
}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  InjectedFormProps<{}, OwnProps> &
  OwnProps;

const FormPasswordReset: FC<Props> = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    resetMessage,
    resetPassword,
    submitSucceeded,
    token,
  } = props;

  const submit = (values: {}) => {
    // resetPassword(values);
  };

  const renderForm = () => {
    return (
      <div className={`form-register`}>
        <h1>Reset password</h1>
        <p>Enter a new password below.</p>
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

function mapStateToProps(
  state: AuthState,
  ownProps: OwnProps
) {
  return {
    resetMessage: resetPasswordMessage(state),
    initialValues: {
      userId: ownProps.uid,
    },
  };
}

const mapDispatchToProps: any = {
  resetPassword,
};

const reduxFormRegister = reduxForm<{}, OwnProps>({
  form: 'password-reset', // a unique identifier for this form
})(FormPasswordReset);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormRegister);
