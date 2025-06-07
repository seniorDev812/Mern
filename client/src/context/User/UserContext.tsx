import { createContext } from "react";
import type { UserContextType } from "./types";

const defaultContext: UserContextType = {
  user: null,
  setUser: () => {},
  logout: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

export default UserContext; 