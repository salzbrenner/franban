import React, { FunctionComponent, useEffect } from 'react';
import {
  getTasks,
  getTasksInterface,
  TaskInterface,
} from 'redux/modules/tasks';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import Task from 'components/Task/Task';

type TasksContainerProps = {
  listId: number;
  // getTasks?: getTasksInterface;
  tasks?: { [index: string]: TaskInterface };
  taskIds: string[];
};
const TasksContainer: FunctionComponent<
  TasksContainerProps
> = React.memo(({ listId, tasks = {}, taskIds = [] }) => {
  // useEffect(() => {
  //   // tasksRequestHandler(id);
  // }, []);

  return (
    <>
      {taskIds.length > 0 &&
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
});

function mapStateToProps({ tasks }: AppState): any {
  return {
    tasks: tasks,
  };
}
export default connect(
  mapStateToProps,
  { getTasks }
)(TasksContainer);
