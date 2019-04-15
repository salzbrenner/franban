import React, { Component } from 'react';
import Dragula from 'react-dragula';

// export default (ChildComponent: Function) => {
class MyComponent extends Component {
  myRef: any;
  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
  }
  dragulaDecorator = (componentBackingInstance: any) => {
    if (componentBackingInstance) {
      let options = {};
      Dragula([componentBackingInstance], options);
    }
  };
  render() {
    return (
      <div ref={this.dragulaDecorator}>
        {this.props.children}
      </div>
    );
  }
}
// };

export default MyComponent;
