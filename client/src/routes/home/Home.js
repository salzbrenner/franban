import React, {Component} from 'react';
import requireAuth from 'components/requireAuth';

class Home extends Component {
  render() {
    return <div>This is the home page!</div>;
  }
}

export default requireAuth(Home);
