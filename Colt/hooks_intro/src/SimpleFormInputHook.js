import React from 'react';
import useFormState from './hooks/useFormState';

export default function SimpleFormInputHook() {
  const [email, updateEmail, resetEmail] = useFormState('');
  const [password, updatePassword, resetPassword] = useFormState('');

  const resetBoth = () => {
    resetEmail();
    resetPassword();
  };

  return (
    <div>
      <h1>
        Hook email is: {email} and password is: {password}
      </h1>
      <input type="text" value={email} onChange={updateEmail}></input>
      <input type="text" value={password} onChange={updatePassword}></input>
      <button onClick={resetBoth}>reset email</button>
      {/* <button onClick={resetPassword}>reset password</button> */}
    </div>
  );
}
