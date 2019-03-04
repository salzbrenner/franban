import React from 'react';
import { DragSource } from 'react-dnd';

export const ItemTypes = {
  CARD_TASK: 'cardTask',
  CARDS_LIST: 'cardsList',
};

const cardTaskSource = {
  beginDrag(props: any) {
    return {};
  },
};

function collect(connect: any, monitor: any) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const CardTask = ({
  connectDragSource,
  isDragging,
}: {
  connectDragSource: any;
  isDragging: any;
}) => (
  <div
    style={{
      opacity: isDragging ? 0.5 : 1,
      fontSize: 25,
      fontWeight: 'bold',
      cursor: 'move',
    }}
  >
    <div className={``}>hello</div>
    <div className={`card-task`}>hello</div>
    <div className={`card-task`}>hello</div>
    <div className={`card-task`}>hello</div>
  </div>
);

export default DragSource(
  ItemTypes.CARD_TASK,
  cardTaskSource,
  collect
)(CardTask);
