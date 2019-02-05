import React from 'react';
import requireAuth from '../components/requireAuth';
import {Route, Switch, Redirect} from 'react-router-dom';
import UserBoards from './user/boards/UserBoards';

const AuthorizedRoutes = ({uid}) => (
    <Switch>
      <Route exact path='/' render={() => <Redirect to={`/${uid}`}/>}/>
      <Route path={'/:uid'} component={UserBoards}/>
      <Route render={() => <h1>NO MATCH FOO</h1>}/>
    </Switch>);

export default requireAuth(AuthorizedRoutes);