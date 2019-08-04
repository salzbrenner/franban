import React from 'react';
import './BoardCard.css';

const BoardCard = ({
  name,
  deleteHandler,
  id,
}: {
  name: string;
  deleteHandler: (id: string) => {};
  id: string;
}) => {
  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    deleteHandler(id);
  };
  return (
    <div className={'board-card'}>
      <div className={`board-card__name`}>{name}</div>
      <div className="board-card__delete-wrap">
        <button
          onClick={e => onDelete(e, id)}
          className="board-card__delete-button"
        >
          Delete board
        </button>
      </div>
    </div>
  );
};

export default BoardCard;
