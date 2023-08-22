import { createContext, useContext } from "react";

const BookContext = createContext(null);

export const BookProvider = BookContext.Provider;

export const useBooks = () => useContext(BookContext);
