import React from 'react';
import FormLogin from 'components/FormLogin/FormLogin';
import requireAuth from 'components/requireAuth';
import {Redirect} from 'react-router';
import {Switch} from 'react-router-dom';

const Login = ({history}) => {
  return (
      <div>
        <FormLogin history={history}/>
      </div>
  )
};

export default requireAuth(Login);
