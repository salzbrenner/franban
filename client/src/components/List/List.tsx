import React from 'react';
import './List.css';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TasksContainer from 'components/TasksContainer/TasksContainer';

export type ListProps = {
  [index: number]: object;
  id: number;
  board_id: number;
  name: string;
  order: number;
  taskIds: string[];
  index: number;
  loading?: boolean;
};

class List extends React.Component<ListProps> {
  constructor(props: ListProps) {
    super(props);
  }
  render() {
    // if (this.props.loading) {
    //   return <h1 />;
    // }
    return (
      <Draggable
        draggableId={`${this.props.id}`}
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
            </div>
            <Droppable
              droppableId={`${this.props.id}`}
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
