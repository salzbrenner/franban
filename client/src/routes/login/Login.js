import React from 'react';
import FormLogin from 'components/FormLogin/FormLogin';
import requireAuth from 'components/requireAuth';

const LoginPage = ({history}) => {
  return (
      <div>
        <FormLogin history={history}/>
      </div>
  )
};

export default requireAuth(LoginPage);
