import React, { useEffect, FunctionComponent } from 'react';
import {
  getUserBoards,
  userBoards,
} from 'redux/modules/user';
import BoardsList from 'components/BoardsList/BoardsList';
import { connect } from 'react-redux';
import { AppState } from 'redux/modules/rootReducer';
import FormAddBoard from 'components/FormAddBoard/FormAddBoard';
import './UserBoards.css';
import { subscribeToBoards } from 'services/socket';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

type OwnProps = {
  uid: string;
};

const UserBoards: FunctionComponent<Props> = props => {
  const { uid, boards, getUserBoards } = props;
  useEffect(() => {
    getUserBoards(uid); // initial load
    subscribeToBoards(() => getUserBoards(uid)); // subscribes socket responses for same event
  }, [uid]);

  return (
    <>
      <FormAddBoard />
      <BoardsList boards={boards} />
    </>
  );
};

function mapStateToProps(
  { user }: AppState,
  ownProps: OwnProps
) {
  return {
    boards: userBoards(user),
    ...ownProps,
  };
}

const mapDispatchToProps: any = {
  getUserBoards: getUserBoards,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBoards);
