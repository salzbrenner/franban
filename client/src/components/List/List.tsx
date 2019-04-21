import React from 'react';
import { ListObjectInterface } from 'redux/modules/lists';
import './List.css';
import CardPlain from 'components/CardPlain/CardPlain';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TasksContainer from 'components/TasksContainer/TasksContainer';

class List extends React.Component<ListObjectInterface> {
  render() {
    return (
      <div className={`list `}>
        <CardPlain extraClassName={`card-plain--task-list`}>
          <div>{this.props.id}</div>
          <Droppable droppableId={`${this.props.stateId}`}>
            {(provided: any) => (
              <TasksContainer
                {...provided.droppableProps}
                placeholder={provided.placeholder}
                innerRef={provided.innerRef}
                listId={this.props.id}
                taskIds={this.props.taskIds}
              />
            )}
          </Droppable>
        </CardPlain>
      </div>
    );
  }
}

export default List;
