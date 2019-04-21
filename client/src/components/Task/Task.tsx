import React from 'react';
import CardPlain from 'components/CardPlain/CardPlain';
import { Draggable } from 'react-beautiful-dnd';
import 'components/CardPlain/CardPlain.css';
import './Task.css';

class Task extends React.Component<any> {
  render() {
    return (
      <Draggable
        draggableId={this.props.stateId}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <div
            className={`task card-plain ${snapshot.isDragging &&
              'task--dragging'}`}
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
