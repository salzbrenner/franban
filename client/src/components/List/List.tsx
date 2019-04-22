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
