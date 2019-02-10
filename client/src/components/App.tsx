import React, { Component } from 'react';
import HeaderContainer from './Header/HeaderContainer';
import { Route, Switch } from 'react-router-dom';
import Login from '../routes/login/Login';
import Register from '../routes/register/Register';
import Logout from '../routes/logout/Logout';
import AuthorizedRoutes from '../routes/AuthorizedRoutes';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <Switch>
          <Route path={'/login'} component={Login} />
          <Route path={'/register'} component={Register} />
          <Route path={'/logout'} component={Logout} />
          <Route component={AuthorizedRoutes} />
        </Switch>
      </div>
    );
  }
}

export default App;
