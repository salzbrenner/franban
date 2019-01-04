import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {register, getErrorMessage } from 'redux/modules/auth';
import {connect} from 'react-redux';

const FormRegister = props => {
  const {handleSubmit, pristine, submitting, history} = props;

  const submit = values => {
    props.register(values, () => {
      history.push('/');
    });
  };

  const errorMessage = () => {
    if (props.errorMessage) {
      return (
          <div className="error">
            {props.errorMessage}
          </div>
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
            <button type="submit" disabled={pristine || submitting}>Login
            </button>
          </div>
        </form>
        {errorMessage()}
      </div>
  );
};

function mapStateToProps(state) {
  return {
    errorMessage: getErrorMessage(state),
  };
}

const reduxFormRegister = reduxForm({
  form: 'register', // a unique identifier for this form
})(FormRegister);

export default connect(mapStateToProps, {register})(reduxFormRegister);

