import React, { FC } from 'react';
import {
  Field,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import {
  addBoard,
  FormAddBoardValues,
  getAddErrorMessage,
  UserState,
} from 'redux/modules/user';
import { connect } from 'react-redux';
import ButtonMain from 'components/ButtonMain/ButtonMain';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  InjectedFormProps & {};

const FormAddBoard: FC<Props> = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    addBoard,
    reset,
  } = props;

  const submit = (values: FormAddBoardValues) => {
    addBoard(values);
    reset();
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
            name="name"
            component="input"
            type="text"
            placeholder="Board name..."
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

const mapDispatchToProps: any = {
  addBoard,
};

const reduxFormAddBoard = reduxForm({
  form: 'addBoard', // a unique identifier for this form
})(FormAddBoard);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormAddBoard);
