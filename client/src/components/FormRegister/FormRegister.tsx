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
import FormAuth from 'components/FormAuth/FormAuth';
import './FormRegister.css';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  InjectedFormProps;

const FormRegister: FC<Props> = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    errorMessage,
  } = props;

  const submit = (values: {}) => {
    props.register(values);
  };

  return (
    <div className={`form-register`}>
      <h1>Sign up</h1>
      <FormAuth
        submitHandler={handleSubmit(submit)}
        pristine={pristine}
        submitting={submitting}
        errorMessage={errorMessage}
      />
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
