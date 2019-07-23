import React, { FunctionComponent, useEffect } from 'react';
import {
  deleteTask,
  TaskInterface,
} from 'redux/modules/tasks';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import Task from 'components/Task/Task';

type TasksContainerProps = typeof mapDispatchToProps;

type OwnProps = {
  listId: number;
  tasks?: { [index: string]: TaskInterface };
  taskIds: string[];
};

const TasksContainer: FunctionComponent<
  TasksContainerProps
> = React.memo(
  ({ listId, tasks = {}, taskIds = [], deleteTask }) => {
    return (
      <>
        {taskIds.length > 0 &&
          taskIds.map((taskId: string, index: any) => (
            <Task
              key={taskId}
              stateId={taskId}
              {...tasks[taskId]}
              index={index}
              deleteHandler={deleteTask}
            />
          ))}
      </>
    );
  }
);

function mapStateToProps(
  { tasks }: AppState,
  ownProps: OwnProps
) {
  return {
    tasks: tasks,
    ...ownProps,
  };
}

const mapDispatchToProps: any = {
  deleteTask,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksContainer);
