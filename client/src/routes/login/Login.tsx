import React from 'react';
import FormLogin from 'components/FormLogin/FormLogin';
import FormPasswordReset from 'components/FormPasswordReset/FormPasswordReset';
import requireAuth from 'components/requireAuth';
import './Login.css';

const Login = ({ history }: { history: History }) => {
  return (
    <div className={'login'}>
      <FormLogin />
      <FormPasswordReset />
    </div>
  );
};

export default requireAuth(Login);
