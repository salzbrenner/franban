import React, { FC, useEffect } from 'react';
import {
  Field,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import { connect } from 'react-redux';
import './FormInviteUser.css';
import {
  addUserToBoard,
  getAddUserMessage,
  getAddUserSuccess,
  resetAddUserState,
} from 'redux/modules/boards';
import { AppState } from 'redux/modules/rootReducer';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  InjectedFormProps & {};

const FormInviteUser: FC<Props> = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    reset,
    addUserToBoard,
    addBoardResult,
    userAdded,
    resetAddUserState,
  } = props;

  useEffect(() => {
    return () => {
      resetAddUserState();
    };
  }, []);

  const submit = async ({
    email,
    boardId,
  }: {
    email: string;
    boardId: number;
  }) => {
    addUserToBoard(boardId, email);
    reset();
  };

  const renderForm = () => {
    return (
      <form
        onSubmit={handleSubmit(submit)}
        autoComplete={'off'}
      >
        <p>
          Enter the email of the user who you would like to
          invite to this board.
        </p>
        <div className={'form-invite-user__fields'}>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
        <button
          className={'form-invite-user__submit'}
          disabled={pristine || submitting}
        >
          <span>&rarr;</span>
        </button>
      </form>
    );
  };

  return (
    <div className={'form-invite-user'}>
      {addBoardResult.length === 0 && renderForm()}
      <p className={userAdded ? '' : 'color-danger'}>
        {addBoardResult}
      </p>
    </div>
  );
};

const mapDispatchToProps: any = {
  addUserToBoard,
  resetAddUserState,
};

const mapStateToProps = ({ board }: AppState) => {
  return {
    addBoardResult: getAddUserMessage(board),
    userAdded: getAddUserSuccess(board),
  };
};

const reduxFormAddList = reduxForm({
  form: 'inviteUser', // a unique identifier for this form
})(FormInviteUser);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormAddList);
