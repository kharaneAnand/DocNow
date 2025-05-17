import React, { createContext } from "react";
import { doctors } from "../assets/assets";

// Step 1: Create the context
export const AppContext = createContext();

// Step 2: Create the Provider component
const AppContextProvider = ({ children }) => {
  const value = { doctors };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
