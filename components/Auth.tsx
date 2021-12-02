import QRCode from "react-qr-code";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth, signInConfig } from "../firebase/client";

export const toURL = (session: string) => {
  const { hostname, protocol } = window.location;
  return `${protocol}//${hostname}/auth/${session}`;
};

type AuthProps = {
  session: string;
};

const Auth = ({ session }: AuthProps) => (
  <div className="flex flex-col justify-around items-center">
    <h1 className="mt-5 font-mono">Please scan to give access :P</h1>
    <QRCode value={toURL(session)} className="mt-5" />
    <h1 className="mt-5 font-mono">Or login :)</h1>
    <StyledFirebaseAuth
      uiConfig={signInConfig}
      firebaseAuth={auth}
      className="mt-5"
    />
  </div>
);

export default Auth;
