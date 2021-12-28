import { createContext, useContext, useEffect, ReactNode } from "react";
import type { User } from "firebase/auth";
import { AuthState, useAuth } from "./auth";
import Auth from "../Auth";
import Loader from "../Loader";

interface AppContextInterface {
  user: User | null;
  state: AuthState;
}

export const AppContext = createContext<AppContextInterface | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  const { user, state, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  if (state === AuthState.Unauthenticated) {
    return <Auth uid={user.uid} />;
  }
  const value = { user, state };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const value = useContext(AppContext);
  if (value === null) {
    throw new Error("Please wrapper compenont in AppContext Provider");
  }
  return value;
};

export const useUser = () => {
  const { user } = useAppContext();
  return user;
};
