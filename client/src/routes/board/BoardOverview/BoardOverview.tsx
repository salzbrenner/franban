import React from 'react';
import FormAddList from 'components/FormAddList/FormAddList';
import ListsContainer from 'components/ListsContainer/ListsContainer';
import {
  DragDropContext,
  Droppable,
} from 'react-beautiful-dnd';

export interface BoardsInterface {
  id: string;
  name: string;
}

const BoardOverview: React.FC<any> = (props: any) => {
  const boardId = +props.match.params.boardId;
  const onDragEnd = (result: any) => {};
  return (
    <>
      {/*className={'d-inline-flex'}*/}
      {/* get the lists */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={boardId + ''}>
          {provided => (
            <div
              className={'d-inline-flex'}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <ListsContainer boardId={boardId} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <FormAddList />
    </>
  );
};

export default BoardOverview;
