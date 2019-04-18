import React from 'react';
import { ListObjectInterface } from 'redux/modules/lists';
import './List.css';
import CardPlain from 'components/CardPlain/CardPlain';
import { Draggable } from 'react-beautiful-dnd';
import TasksContainer from 'components/TasksContainer/TasksContainer';

class List extends React.Component<any> {
  render() {
    return (
      <div className={`list`}>
        <div className="">{this.props.id}</div>
        <TasksContainer listId={this.props.id} />
      </div>
    );
  }
}

export default List;
