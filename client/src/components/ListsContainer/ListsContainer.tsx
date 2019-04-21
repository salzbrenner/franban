import React, { Component, useEffect } from 'react';
import {
  getLists,
  getListsInterface,
  ListObjectInterface,
  updateListTasks,
} from 'redux/modules/lists';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import {
  DragDropContext,
  Droppable,
} from 'react-beautiful-dnd';
import List from 'components/List/List';

// TODO: Fix this interface
interface ListsContainerInterface {
  boardId: number;
  updateListTasks?: any;
  getLists?: getListsInterface;
  lists?: ListObjectInterface[];
  order?: number[];
}

const ListsContainer = ({
  getLists,
  updateListTasks,
  boardId,
  lists,
  order,
}: ListsContainerInterface) => {
  useEffect(() => {
    if (getLists) {
      getLists(boardId);
    }
  }, []);

  function onDragEnd(result: any) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (!lists) {
      return;
    }

    const list: ListObjectInterface =
      lists[source.droppableId];
    const newTaskIds = Array.from(list.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    updateListTasks(destination.droppableId, newTaskIds);
  }

  return (
    <>
      {order && lists && (
        <DragDropContext onDragEnd={onDragEnd}>
          {order.map((listId: any, index) => {
            return (
              <List
                key={listId}
                stateId={listId}
                {...lists[listId]}
                index={index}
              />
            );
          })}
        </DragDropContext>
      )}
    </>
  );
};

// };

function mapStateToProps({ lists }: AppState): any {
  return {
    lists: lists.lists,
    order: lists.listOrder,
  };
}

export default connect(
  mapStateToProps,
  { getLists, updateListTasks }
)(ListsContainer);
