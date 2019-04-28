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
} from 'redux/modules/auth';
import { connect } from 'react-redux';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  InjectedFormProps;

const FormRegister: FC<Props> = props => {
  const { handleSubmit, pristine, submitting } = props;

  const submit = (values: {}) => {
    props.register(values);
  };

  const errorMessage = () => {
    if (props.errorMessage) {
      return (
        <div className="error">{props.errorMessage}</div>
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div>
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
          <button
            type="submit"
            disabled={pristine || submitting}
          >
            Register
          </button>
        </div>
      </form>
      {errorMessage()}
    </div>
  );
};

function mapStateToProps(state: AuthState) {
  return {
    errorMessage: getErrorMessage(state),
  };
}

const mapDispatchToProps: any = {
  register,
};

const reduxFormRegister = reduxForm({
  form: 'register', // a unique identifier for this form
})(FormRegister);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormRegister);
