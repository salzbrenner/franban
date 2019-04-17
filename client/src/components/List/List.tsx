import React from 'react';
import { ListObjectInterface } from 'redux/modules/lists';
import './List.css';
import CardPlain from 'components/CardPlain/CardPlain';
import { Draggable } from 'react-beautiful-dnd';

class List extends React.Component<any> {
  render() {
    return (
      <Draggable
        draggableId={this.props.id}
        index={this.props.index}
      >
        {provided => (
          <div
            className="task-list__name"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.id}
          </div>
        )}
      </Draggable>
    );
  }
}

export default List;
