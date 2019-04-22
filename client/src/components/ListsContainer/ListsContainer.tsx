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
  resetLists?: any;
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
  resetLists,
}) => {
  useEffect(() => {
    if (getListsAndTasks) {
      getListsAndTasks(boardId);
    }

    return function cleanup() {
      resetLists();
    };
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

    const start: ListProps = lists[source.droppableId];
    const finish: ListProps =
      lists[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newList = {
        ...start,
        taskIds: newTaskIds,
      };

      updateListTasks(`list-${newList.id}`, newList);
      return;
    }

    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartList = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishList = {
      ...finish,
      taskIds: finishTaskIds,
    };
    // update both lists
    updateListTasks(
      `list-${newStartList.id}`,
      newStartList
    );
    updateListTasks(
      `list-${newFinishList.id}`,
      newFinishList
    );
  }

  return (
    <>
      {
        <DragDropContext onDragEnd={onDragEnd}>
          {order &&
            order.map((listId: any, index) => {
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
