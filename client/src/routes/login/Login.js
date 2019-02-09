import React from 'react';
import FormLogin from 'components/FormLogin/FormLogin';
import requireAuth from 'components/requireAuth';
import './Login.css';

const Login = ({ history }) => {
  return (
    <div className={'login'}>
      <FormLogin history={history} />
    </div>
  );
};

export default requireAuth(Login);
