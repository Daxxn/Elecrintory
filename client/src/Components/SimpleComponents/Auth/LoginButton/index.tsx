import React from 'react';
import UserModel from '../../../../Data/Models/UserModel';
import { useAuth0 } from '@auth0/auth0-react';
import './LoginButton.css';

export interface LoginButtonProps {
   user: UserModel | null;
}

const LoginButton = (props: LoginButtonProps): JSX.Element => {
   const { user } = props;
   const { loginWithRedirect, logout } = useAuth0();

   return (
      <div className="login-button-cont">
         {!user ? (
            <button onClick={() => loginWithRedirect({ screen_hint: 'login' })}>
               Login
            </button>
         ) : (
            <button onClick={() => logout({ returnTo: window.location.origin })}>
               Logout
            </button>
         )}
      </div>
   );
};

export default LoginButton;
