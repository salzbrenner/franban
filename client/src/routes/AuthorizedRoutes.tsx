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
import BoardOverviewContainer from 'routes/board/BoardOverview/BoardOverviewContainer';

const AuthorizedRoutes = ({ uid }: { uid: string }) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to={`/${uid}`} />}
      />
      <Route path={'/styleguide'} component={Styleguide} />
      <Route
        path={'/:uid(\\d+)'}
        render={props => <UserBoards uid={uid} />}
      />
      <Route
        path={'/board/:boardId'}
        render={props => (
          <BoardOverviewContainer {...props} />
        )}
      />
      <Route render={() => <h1>NO MATCH FOO</h1>} />
    </Switch>
  );
};

export default requireAuth(AuthorizedRoutes);
