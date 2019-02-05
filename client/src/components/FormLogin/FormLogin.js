import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {login, getErrorMessage } from 'redux/modules/auth';
import {connect} from 'react-redux';

const FormLogin = props => {
  const {handleSubmit, pristine, submitting, history} = props;

  const submit = values => {
    props.login(values);
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

const reduxFormLogin = reduxForm({
  form: 'login', // a unique identifier for this form
})(FormLogin);

export default connect(mapStateToProps, {login})(reduxFormLogin);

