import React, { useEffect } from 'react';
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
  tasksRequestHandler: any;
};

const List: React.FC<ListProps> = props => {
  const { id, tasksRequestHandler } = props;
  useEffect(() => {
    tasksRequestHandler(id);
  }, []);
  return (
    <Draggable
      draggableId={`${props.id}`}
      index={props.index}
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
            {props.name}
          </div>
          <Droppable
            droppableId={`${props.id}`}
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
                  listId={props.id}
                  taskIds={props.taskIds}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
