import { useContext } from "react";
import UserContext from "./UserContext";
import type { UserContextType } from "./types";

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser; 