import React from 'react';
import FormRegister from 'components/FormRegister/FormRegister';
import requireAuth from 'components/requireAuth';
import './Register.css';

const Register = () => {
  return (
    <div className={`register`}>
      <FormRegister />
    </div>
  );
};

export default requireAuth(Register);
