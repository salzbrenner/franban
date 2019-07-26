import React from 'react';
import FormPasswordResetRequest from 'components/FormPasswordResetRequest/FormPasswordResetRequest';
import requireAuth from 'components/requireAuth';

const ResetPasswordRequest = ({
  history,
}: {
  history: History;
}) => {
  return (
    <div className={'login'}>
      <FormPasswordResetRequest />
    </div>
  );
};

export default requireAuth(ResetPasswordRequest);
