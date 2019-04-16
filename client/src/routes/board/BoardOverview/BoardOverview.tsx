import React from 'react';
import FormAddList from 'components/FormAddList/FormAddList';
import DragulaContainer from 'components/DragulaContainer/DragulaContainer';
import ListsContainer from 'components/ListsContainer/ListsContainer';

export interface BoardsInterface {
  id: string;
  name: string;
}

const BoardOverview: React.FC<any> = (props: any) => {
  const boardId = +props.match.params.boardId;
  return (
    <>
      <DragulaContainer
        options={{
          direction: 'horizontal',
        }}
        className={'d-inline-flex'}
      >
        {/* get the lists */}
        <ListsContainer boardId={boardId} />
      </DragulaContainer>
      <FormAddList />
    </>
  );
};

export default BoardOverview;
