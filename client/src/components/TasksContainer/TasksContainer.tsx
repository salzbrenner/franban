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

interface TasksContainerInterface {
  listId: number;
  getTasks?: getTasksInterface;
  tasks?: { [index: string]: TaskInterface };
  taskIds?: string[];
}
const TasksContainer = ({
  getTasks,
  listId,
  tasks,
  taskIds,
}: TasksContainerInterface) => {
  useEffect(() => {
    if (getTasks) {
      getTasks(listId);
    }
  }, []);
  return (
    <>
      {tasks &&
        taskIds &&
        taskIds.map((taskId: string, index: any) => (
          <Task
            key={taskId}
            stateId={taskId}
            {...tasks[taskId]}
            index={index}
          />
        ))}
    </>
  );
};

function mapStateToProps({ tasks }: AppState): any {
  return {
    tasks: tasks,
  };
}
export default connect(
  mapStateToProps,
  { getTasks }
)(TasksContainer);
