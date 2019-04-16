import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  login,
  getErrorMessage,
  FormAuthValues,
  AuthState,
} from 'redux/modules/auth';
import { connect } from 'react-redux';
import ButtonMain from 'components/ButtonMain/ButtonMain';
import './FormAddList.css';

const FormAddList = (props: any) => {
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
    <div className={'form-add-list'}>
      <form onSubmit={handleSubmit(submit)}>
        <div className={'form-add-list__fields'}>
          <Field
            name="email"
            component="input"
            type="text"
            placeholder="Enter list title..."
          />
        </div>
        <div>
          <ButtonMain
            text={'Add List'}
            type="submit"
            secondary={true}
            disabled={pristine || submitting}
          />
        </div>
      </form>
      <div className="form-add-list__error">
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

const reduxFormAddList = reduxForm({
  form: 'addList', // a unique identifier for this form
})(FormAddList);

export default connect(
  mapStateToProps,
  { login }
)(reduxFormAddList);
