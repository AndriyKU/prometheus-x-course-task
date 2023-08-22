import { createContext, useContext } from "react";

const UsernameContext = createContext("");

export const UsernameProvider = UsernameContext.Provider;

export const useUsername = () => useContext(UsernameContext);
