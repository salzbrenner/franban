import React, { FC } from 'react';
import FormAddList from 'components/FormAddList/FormAddList';
import ListsContainer from 'components/ListsContainer/ListsContainer';

type Props = {
  boardId: number;
  name: string;
  listIds: any[];
};

const BoardOverview: FC<Props> = ({
  boardId,
  listIds,
  name,
}) => {
  return (
    <>
      <h1>{name}</h1>
      <div className={`d-inline-flex`}>
        {console.log(listIds, 'JUST BEFORE RENDER')}
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
