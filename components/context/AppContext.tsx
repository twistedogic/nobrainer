import { createContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import type { User } from "firebase/auth";
import { auth } from "../../firebase/client";
import Auth from "../Auth";
import Loader from "../Loader";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      toast.error(JSON.stringify(error));
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };
  return [storedValue, setValue] as const;
}

const useSession = () => {
  const uuid = uuidv4();
  const [session, setSession] = useLocalStorage("session", uuid);
  useEffect(() => {
    setSession(session);
  }, [session]);
  return session;
};

interface AppContextInterface {
  user: User | null;
  session: string;
}

export const AppContext = createContext<AppContextInterface | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  const [user, loading, error] = useAuthState(auth);
  const session = useSession();
  if (error) {
    toast.error(JSON.stringify(error));
  }
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Auth session={session} />;
  }
  const value = {
    user,
    session,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
