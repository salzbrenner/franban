import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import HeaderContainer from './Header/HeaderContainer';
import Login from '../routes/login/Login';
import Register from '../routes/register/Register';
import Logout from '../routes/logout/Logout';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});

it('renders a header', () => {
  expect(wrapped.find(HeaderContainer).length).toEqual(1);
});

it('renders correct routes', () => {
  const pathMap = wrapped
    .find('Route')
    .reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});

  expect(pathMap['/login']).toBe(Login);
  expect(pathMap['/register']).toBe(Register);
  expect(pathMap['/logout']).toBe(Logout);
});
