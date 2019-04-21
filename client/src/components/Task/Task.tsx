import React from 'react';
import CardPlain from 'components/CardPlain/CardPlain';
import { Draggable } from 'react-beautiful-dnd';
class Task extends React.Component<any> {
  render() {
    return (
      <Draggable
        draggableId={this.props.stateId}
        index={this.props.index}
      >
        {provided => (
          <div
            className={`task`}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="task__name">
              {this.props.name}
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Task;
