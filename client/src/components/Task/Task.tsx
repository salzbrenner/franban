import React from 'react';
class Task extends React.Component<any> {
  render() {
    return (
      <div className={`task`}>
        <div className="task__name">{this.props.name}</div>
      </div>
    );
  }
}

export default Task;
