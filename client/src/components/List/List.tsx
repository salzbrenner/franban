import React from 'react';
import { ListObjectInterface } from 'redux/modules/lists';
import './List.css';
import CardPlain from 'components/CardPlain/CardPlain';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TasksContainer from 'components/TasksContainer/TasksContainer';

class List extends React.Component<ListObjectInterface> {
  render() {
    return (
      <div>
        <div className={`list`}>
          <div className={`list__name`}>
            {this.props.name}
          </div>
          <Droppable droppableId={`${this.props.stateId}`}>
            {(provided, snapshot) => (
              <div
                className={`list__tasks-wrapper ${snapshot.isDraggingOver &&
                  `list__tasks-wrapper--dragging-over`}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <TasksContainer
                  listId={this.props.id}
                  taskIds={this.props.taskIds}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    );
  }
}

export default List;
