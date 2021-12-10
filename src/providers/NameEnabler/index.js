import { createContext, useContext, useState } from "react";

const NameEnablerContext = createContext();

export const NameEnabler = ({ children }) => {
  const [ name, setName ] = useState('Todos DEVs');
  return (
    <NameEnablerContext.Provider
      value={{ name, setName }}
    >
      {children}
    </NameEnablerContext.Provider>
  )
}

export const NameEnablerInfo = () => useContext(NameEnablerContext);