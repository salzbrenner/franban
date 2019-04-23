import React from 'react';
import './List.css';
import CardPlain from 'components/CardPlain/CardPlain';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TasksContainer from 'components/TasksContainer/TasksContainer';

export type ListProps = {
  id: number;
  stateId: string;
  board_id: number;
  name: string;
  order: number;
  taskIds: string[];
  index?: any;
  loading?: boolean;
};

class List extends React.Component<ListProps> {
  constructor(props: ListProps) {
    super(props);
  }
  render() {
    if (this.props.loading) {
      return <h1 />;
    }
    return (
      <Draggable
        draggableId={this.props.stateId}
        index={this.props.index}
        type={`LIST`}
      >
        {provided => (
          <div
            className={`list`}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div
              className={`list__name`}
              {...provided.dragHandleProps}
            >
              {this.props.name}
              {this.props.stateId}
            </div>
            <Droppable
              droppableId={`${this.props.stateId}`}
              type={`TASK`}
            >
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
        )}
      </Draggable>
    );
  }
}

export default List;
