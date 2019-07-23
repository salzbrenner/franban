import React from 'react';
import {
  deleteList,
  listOrderSelector,
  listsSelector,
  resetLists,
  updateListsOrderAndSendToServer,
  updateListTasks,
  getListsForBoard,
} from 'redux/modules/lists';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import ListsDND from 'components/ListsDND/ListsDnd';
import { getTasks, updateTask } from 'redux/modules/tasks';

type OwnProps = {
  boardId: number;
  // listIds: number[];
};

export function mapStateToProps(
  { lists }: AppState,
  ownProps: OwnProps
) {
  return {
    lists: listsSelector(lists),
    order: listOrderSelector(lists),
    ...ownProps,
  };
}

export const mapDispatchToProps: any = {
  updateListTasks,
  resetLists,
  updateListsOrderAndSendToServer,
  getTasks,
  updateTask,
  getListsForBoard,
  deleteList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsDND);
