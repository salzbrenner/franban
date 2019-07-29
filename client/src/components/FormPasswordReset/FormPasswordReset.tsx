import React, { FC, useEffect } from 'react';
import {
  SubmissionError,
  Field,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import {
  AuthState,
  resetPasswordSubmitter,
} from 'redux/modules/auth';
import { connect } from 'react-redux';
import ButtonMain from 'components/ButtonMain/ButtonMain';

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
    submitSucceeded,
    resetPasswordSubmitter,
    error,
  } = props;

  const submit = async (values: {
    password: string;
    token: string;
  }) => {
    const updated = await resetPasswordSubmitter(values);
    if (!updated) {
      throw new SubmissionError({
        password: 'password could not be updated',
        _error: 'Could not update',
      });
    }
  };

  const renderForm = () => {
    const {} = props;
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
              name="password"
              component="input"
              type="password"
              placeholder="password"
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
      {!(submitSucceeded || error) && renderForm()}
      {submitSucceeded && (
        <p>Thank you. Please login to continue</p>
      )}
      {error && (
        <p>There was an error processing your request</p>
      )}
    </>
  );
};

function mapStateToProps(
  state: AuthState,
  ownProps: OwnProps
) {
  return {
    initialValues: {
      token: ownProps.token,
    },
  };
}

const mapDispatchToProps: any = {
  resetPasswordSubmitter,
};

const reduxFormRegister = reduxForm<{}, OwnProps>({
  form: 'password-reset-submitter', // a unique identifier for this form
})(FormPasswordReset);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormRegister);
