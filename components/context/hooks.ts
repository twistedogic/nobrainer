import { useContext } from "react";
import { AppContext } from "./AppContext";

const useAppContext = () => {
  const value = useContext(AppContext);
  if (value === null) {
    throw new Error("Please wrapper compenont in AppContext Provider");
  }
  return value;
};
