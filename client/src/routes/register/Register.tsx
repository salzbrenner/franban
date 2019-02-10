import React from 'react';
import FormRegister from 'components/FormRegister/FormRegister';
import requireAuth from 'components/requireAuth';

const Register = () => {
  return (
    <div>
      <FormRegister />
    </div>
  );
};

export default requireAuth(Register);
