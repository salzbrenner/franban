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

const BoardOverview = ({ boardId, listIds }: any) => {
  return (
    <>
      <div className={`d-inline-flex`}>
        {console.log(boardId, listIds)}
        {listIds && (
          <ListsContainer
            boardId={boardId}
            listIds={listIds}
          />
        )}

        <FormAddList />
      </div>
    </>
  );
};

export default BoardOverview;
