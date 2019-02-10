import React from 'react';
import FormLogin from 'components/FormLogin/FormLogin';
import requireAuth from 'components/requireAuth';
import './Login.css';

const Login = ({ history }: { history: any }) => {
  return (
    <div className={'login'}>
      <FormLogin />
    </div>
  );
};

export default requireAuth(Login);
