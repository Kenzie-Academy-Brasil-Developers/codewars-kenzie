import { createContext, useContext, useState } from "react";

const NameEnablerContext = createContext();

export const NameEnabler = ({ children }) => {
  const [ name, setName ] = useState('Calebe');
  return (
    <NameEnablerContext.Provider
      value={{ name, setName }}
    >
      {children}
    </NameEnablerContext.Provider>
  )
}

export const NameEnablerInfo = () => useContext(NameEnablerContext);