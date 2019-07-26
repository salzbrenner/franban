import React from 'react';
import FormLogin from 'components/FormLogin/FormLogin';
import FormPasswordReset from 'components/FormPasswordResetRequest/FormPasswordResetRequest';
import requireAuth from 'components/requireAuth';
import './Login.css';

const Login = ({ history }: { history: History }) => {
  return (
    <div className={'login'}>
      <FormLogin />
    </div>
  );
};

export default requireAuth(Login);
