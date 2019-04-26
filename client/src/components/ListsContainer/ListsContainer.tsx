import React from 'react';
import {
  getLists,
  getListsAndTasks,
  listOrderSelector,
  listsSelector,
  resetLists,
  updateListsOrderAndSendToServer,
  updateListTasks,
} from 'redux/modules/lists';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import ListsDND from 'components/ListsDND/ListsDnd';

type OwnProps = {
  boardId: number;
  listIds: any;
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
  getLists,
  updateListTasks,
  getListsAndTasks,
  resetLists,
  updateListsOrderAndSendToServer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsDND);
