import React, { Component, useEffect } from 'react';
import {
  getLists,
  getListsInterface,
  ListObjectInterface,
} from 'redux/modules/lists';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import TaskList from 'components/TaskList/TaskList';

// export default (ChildComponent: Function) => {
// class ListsContainer extends Component {
//
// }
interface ListsContainerInterface {
  boardId: number;
  getLists?: getListsInterface;
  lists?: ListObjectInterface[];
}
const ListsContainer = ({
  getLists,
  boardId,
  lists,
}: ListsContainerInterface) => {
  useEffect(() => {
    if (getLists) {
      getLists(boardId);
    }
  }, []);

  return (
    <>
      {lists &&
        lists.map(list => (
          <TaskList key={list.id} {...list} />
        ))}
    </>
  );
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
