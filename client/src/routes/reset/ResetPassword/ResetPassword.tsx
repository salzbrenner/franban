import React, { useEffect } from 'react';
import requireAuth from 'components/requireAuth';
import FormPasswordReset from 'components/FormPasswordReset/FormPasswordReset';
import { confirmToken } from 'services/api';

const ResetPassword = ({
  history,
  match,
}: {
  history: History;
  match: any;
}) => {
  const token = match.params.token;

  useEffect(() => {
    confirmToken(token);
  }, [token]);

  return (
    <div className={'login'}>
      <FormPasswordReset token={token} />
    </div>
  );
};

export default requireAuth(ResetPassword);
