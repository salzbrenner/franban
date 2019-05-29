import React, { FC, useState } from 'react';
import Modal from 'react-modal';

type Props = {};

const ModalComponent: FC<Props> = props => {
  const [isOpen, toggleOpen] = useState(false);

  return (
    <div>
      <button onClick={() => toggleOpen(!isOpen)}>
        Open Modal
      </button>
      <Modal isOpen={isOpen} contentLabel="Example Modal">
        <button onClick={() => toggleOpen(!isOpen)}>
          close
        </button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
};

export default ModalComponent;
