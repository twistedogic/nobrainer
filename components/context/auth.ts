import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, defaultLogin } from "../../firebase/client";

export enum AuthState {
  Unauthenticated,
  Authenticated,
  Granted,
}

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    (async () => {
      if (!user && !loading) {
        await defaultLogin();
      }
    })();
  }, [user]);
  if (error) {
    toast.error(JSON.stringify(error));
  }
  const isAnonymous = user?.isAnonymous;
  const state = isAnonymous
    ? AuthState.Unauthenticated
    : AuthState.Authenticated;
  return { user, state, loading };
};
