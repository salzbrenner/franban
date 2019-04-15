import React, { Component, useEffect } from 'react';
import {
  getLists,
  getListsInterface,
} from 'redux/modules/lists';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';

// export default (ChildComponent: Function) => {
// class ListsContainer extends Component {
//
// }
interface ListsContainerInterface {
  boardId: number;
  getLists?: getListsInterface;
}
const ListsContainer = ({
  getLists,
  boardId,
}: ListsContainerInterface) => {
  useEffect(() => {
    if (getLists) {
      getLists(boardId);
    }
  }, []);
  return <></>;
};
// };

function mapStateToProps({ lists }: AppState): any {
  return {
    lists: lists.lists,
  };
}
export default connect(
  mapStateToProps,
  { getLists }
)(ListsContainer);
