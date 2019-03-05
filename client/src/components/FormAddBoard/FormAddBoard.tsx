import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  addBoard,
  FormAddBoardValues,
  getAddErrorMessage,
  UserState,
} from 'redux/modules/user';
import { connect } from 'react-redux';
import ButtonMain from 'components/ButtonMain/ButtonMain';

const FormAddBoard = (props: any) => {
  const { handleSubmit, pristine, submitting } = props;

  const submit = (values: FormAddBoardValues) => {
    props.addBoard(values);
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
            name="title"
            component="input"
            type="text"
            placeholder="Enter board title..."
          />
        </div>
        <div>
          <ButtonMain
            text={'Create Board'}
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

function mapStateToProps(state: UserState) {
  return {
    errorMessage: getAddErrorMessage(state),
  };
}

const reduxFormAddBoard = reduxForm({
  form: 'addBoard', // a unique identifier for this form
})(FormAddBoard);

export default connect(
  mapStateToProps,
  { addBoard }
)(reduxFormAddBoard);
