import React, { useEffect } from 'react';
import './List.css';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TasksContainer from 'components/TasksContainer/TasksContainer';

export type ListProps = {
  [index: number]: object;
  id: number;
  boardId: number;
  name: string;
  order: number;
  taskIds: string[];
  index: number;
  tasksRequestHandler: Function;
  deleteHandler: () => void;
};

const List: React.FC<ListProps> = props => {
  const {
    id,
    tasksRequestHandler,
    index,
    taskIds,
    deleteHandler,
    name,
  } = props;
  useEffect(() => {
    tasksRequestHandler(id);
  }, []);
  return (
    <Draggable
      draggableId={`${id}`}
      index={index}
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
            {name}
          </div>
          <div>
            <button onClick={deleteHandler}>delete</button>
          </div>
          <Droppable droppableId={`${id}`} type={`TASK`}>
            {(provided, snapshot) => (
              <div
                className={`list__tasks-wrapper ${snapshot.isDraggingOver &&
                  `list__tasks-wrapper--dragging-over`}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <TasksContainer
                  listId={id}
                  taskIds={taskIds}
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
