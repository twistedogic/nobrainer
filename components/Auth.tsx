import QRCode from "react-qr-code";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth, signInConfig } from "../firebase/client";

const toURL = (session: string) => {
  const { hostname, protocol } = window.location;
  return `${protocol}//${hostname}/auth/${session}`;
};

type AuthProps = {
  session: string;
};

const Auth = ({ session }: AuthProps) => (
  <div className="flex flex-col justify-center content-center justify-items-center">
    <QRCode value={toURL(session)} />
    <StyledFirebaseAuth uiConfig={signInConfig} firebaseAuth={auth} />
  </div>
);

export default Auth;
