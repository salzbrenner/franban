import React, { Component, useEffect } from 'react';
import {
  getLists,
  getListsInterface,
  ListObjectInterface,
} from 'redux/modules/lists';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import List from 'components/List/List';

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
        lists.map((props, index) => (
          <List key={props.id} {...props} index={index} />
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
