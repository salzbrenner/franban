import React from 'react';
import FormRegister from 'components/FormRegister/FormRegister';
import requireAuth from 'components/requireAuth';

const Register = ({history}) => {
  return (
      <div>
        <FormRegister history={history} />
      </div>
  )
};

export default requireAuth(Register);
