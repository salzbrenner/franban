import React from 'react';
import FormAddList from 'components/FormAddList/FormAddList';
import CardsList from 'components/CardsList/CardsList';
import DragulaContainer from 'components/DragulaContainer/DragulaContainer';
import ListsContainer from 'components/ListsContainer/ListsContainer';

export interface BoardsInterface {
  id: string;
  name: string;
}

const BoardOverview: React.FC<any> = (props: any) => {
  const boardId = +props.match.params.boardId;
  return (
    <div className={''}>
      <FormAddList />
      <ListsContainer boardId={boardId} />
      <DragulaContainer>
        {/* get the lists */}
        <div>Swap me around</div>
        <div>Swap her around</div>
        <div>Swap him around</div>
        <div>Swap them around</div>
        <div>Swap us around</div>
        <div>Swap things around</div>
        <div>Swap everything around</div>
      </DragulaContainer>
    </div>
  );
};

export default BoardOverview;
