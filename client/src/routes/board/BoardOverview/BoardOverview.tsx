import React from 'react';
import FormAddList from 'components/FormAddList/FormAddList';

export interface BoardsInterface {
  id: string;
  name: string;
}

const BoardOverview: React.FC<any> = () => (
  <div className={''}>
    <FormAddList />
  </div>
);

export default BoardOverview;
