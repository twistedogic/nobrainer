import QRCode from "react-qr-code";
import { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth, signInConfig } from "../firebase/client";

export const toURL = (uid: string) => {
  const { hostname, protocol } = window.location;
  return `${protocol}//${hostname}/auth/${uid}`;
};

type AuthProps = {
  uid: string;
};

const Auth = ({ uid }: AuthProps) => (
  <div className="flex flex-col justify-around items-center">
    <h1 className="mt-5 font-mono">Please scan to give access :P</h1>
    <QRCode value={toURL(uid)} className="mt-5" />
    <h1 className="mt-5 font-mono">Or login :)</h1>
    <StyledFirebaseAuth
      uiConfig={signInConfig}
      firebaseAuth={auth}
      className="mt-5"
    />
  </div>
);

export default Auth;
