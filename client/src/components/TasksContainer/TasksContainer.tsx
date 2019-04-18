import React, { Component, useEffect } from 'react';
import {
  getTasks,
  getTasksInterface,
  TaskInterface,
} from 'redux/modules/tasks';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import List from 'components/List/List';
import { Droppable } from 'react-beautiful-dnd';
import Task from 'components/Task/Task';

interface ListsContainerInterface {
  listId: number;
  getTasks?: getTasksInterface;
  tasks?: TaskInterface[];
}
const ListsContainer = ({
  getTasks,
  listId,
  tasks,
}: ListsContainerInterface) => {
  useEffect(() => {
    if (getTasks) {
      getTasks(listId);
    }
  }, []);

  return (
    <>
      {tasks &&
        tasks.map((props, index) => (
          <Task key={props.id} {...props} index={index} />
        ))}
    </>
  );
};
// };

function mapStateToProps({ tasks }: AppState): any {
  return {
    tasks: tasks.tasks,
  };
}
export default connect(
  mapStateToProps,
  { getTasks }
)(ListsContainer);
