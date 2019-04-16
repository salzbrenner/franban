import React, { Component } from 'react';
import Dragula from 'react-dragula';

type Props = {
  options: {};
  children: any;
  className?: string;
};

class DragulaContainer extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  dragulaDecorator = (componentBackingInstance: any) => {
    const { options } = this.props;

    if (componentBackingInstance) {
      const dragulaOptions = options ? options : {};
      Dragula([componentBackingInstance], dragulaOptions);
    }
  };
  render() {
    const { children, options, className } = this.props;
    return (
      <div
        className={className ? className : ''}
        ref={this.dragulaDecorator}
      >
        {children}
      </div>
    );
  }
}

export default DragulaContainer;
