import React, { useState } from 'react';
import CardPlain from 'components/CardPlain/CardPlain';
import { Draggable } from 'react-beautiful-dnd';
import 'components/CardPlain/CardPlain.css';
import './Task.css';
import Modal from 'react-modal';
type Props = {
  stateId: string;
  index: number;
  name: string;
};

class Task extends React.Component<Props> {
  state = {
    isOpen: false,
  };

  constructor(props: Props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      isOpen: true,
    });
  }

  closeModal() {
    this.setState({
      isOpen: false,
    });
    console.log(this.state);
  }

  render() {
    return (
      <>
        <Draggable
          draggableId={this.props.stateId}
          index={this.props.index}
        >
          {(provided, snapshot) => (
            <div
              onClick={this.openModal}
              className={`task card-plain ${snapshot.isDragging &&
                'task--dragging'}`}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <div className="task__name">
                {this.props.name}
              </div>
            </div>
          )}
        </Draggable>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal {this.state.isOpen}</div>
          </>
        </Modal>
      </>
    );
  }
}

export default Task;
