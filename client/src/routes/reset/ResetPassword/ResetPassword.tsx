import React, { useEffect, useState } from 'react';
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

  const [uid, setUid] = useState(null);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    confirmToken(token).then(
      res => {
        setUid(res.data.uid);
      },
      err => setInvalid(true)
    );
  }, [token]);

  return (
    <div className={'login'}>
      {uid && <FormPasswordReset uid={uid} />}
      {invalid && (
        <p>
          Password renewal has expired. Please request
          another reset.
        </p>
      )}
    </div>
  );
};

export default requireAuth(ResetPassword);
