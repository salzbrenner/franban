import React from 'react';
import requireAuth from '../components/requireAuth';
import {
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import UserBoards from './user/boards/UserBoards';
import Styleguide from './styleguide/Styleguide';

const AuthorizedRoutes = ({ uid }: { uid: string }) => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => <Redirect to={`/${uid}`} />}
    />
    <Route path={'/styleguide'} component={Styleguide} />
    <Route path={'/:uid(\\d+)'} component={UserBoards} />
    <Route
      path={'/board/:boardId'}
      component={() => <h1>Board page</h1>}
    />
    <Route render={() => <h1>NO MATCH FOO</h1>} />
  </Switch>
);

export default requireAuth(AuthorizedRoutes);
