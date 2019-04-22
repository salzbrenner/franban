import React, { FunctionComponent, useEffect } from 'react';
import {
  getLists,
  getListsAndTasks,
  getListsInterface,
  listOrderSelector,
  listsSelector,
  resetLists,
  updateListTasks,
} from 'redux/modules/lists';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import {
  DragDropContext,
  Droppable,
} from 'react-beautiful-dnd';
import List, { ListProps } from 'components/List/List';

// TODO: Fix this interface
type ListsContainerProps = {
  boardId: number;
  updateListTasks?: any;
  getLists?: getListsInterface;
  lists?: { [index: string]: ListProps };
  order?: number[];
  getListsAndTasks?: any;
};

const ListsContainer: FunctionComponent<
  ListsContainerProps
> = ({
  getLists,
  updateListTasks,
  boardId,
  lists = {},
  order,
  getListsAndTasks,
}) => {
  useEffect(() => {
    if (getListsAndTasks) {
      getListsAndTasks(boardId);
    }

    return function cleanup() {};
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

    const list: ListProps = lists[source.droppableId];
    const newTaskIds = Array.from(list.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    updateListTasks(destination.droppableId, newTaskIds);
  }

  return (
    <>
      {
        <DragDropContext onDragEnd={onDragEnd}>
          {order &&
            order.map((listId: any, index) => {
              console.log(lists[listId]);
              return (
                <List
                  key={listId}
                  loading={true}
                  stateId={listId}
                  {...lists[listId]}
                  index={index}
                />
              );
            })}
        </DragDropContext>
      }
    </>
  );
};

function mapStateToProps({ lists }: AppState): any {
  return {
    lists: listsSelector(lists),
    order: listOrderSelector(lists),
  };
}

const mapDispatchToProps = {
  getLists,
  updateListTasks,
  getListsAndTasks,
  resetLists,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsContainer);
