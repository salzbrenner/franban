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
  const onDragEnd = (result: any) => {
    const {
      destination,
      source,
      draggableId,
      type,
    } = result;
  };
  return (
    <>
      <div className={`d-inline-flex`}>
        <ListsContainer boardId={boardId} />
      </div>
      <FormAddList />
    </>
  );
};

export default BoardOverview;
