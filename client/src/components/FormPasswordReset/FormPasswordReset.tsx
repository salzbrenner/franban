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
} from 'redux/modules/auth';
import { connect } from 'react-redux';
import ButtonMain from 'components/ButtonMain/ButtonMain';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  InjectedFormProps;

const FormPassWordReset: FC<Props> = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    errorMessage,
    resetPassword,
  } = props;

  const submit = (values: {}) => {
    resetPassword(values);
  };

  return (
    <div className={`form-register`}>
      <h1>ResetPassword</h1>
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

function mapStateToProps(state: AuthState) {
  return {
    errorMessage: getErrorMessage(state),
  };
}

const mapDispatchToProps: any = {
  resetPassword,
};

const reduxFormRegister = reduxForm({
  form: 'password-reset', // a unique identifier for this form
})(FormPassWordReset);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormRegister);
