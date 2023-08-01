import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Context = createContext();

const ContextProvider = ({ children }) => {
  //api calls

  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  return (
    <Context.Provider
      value={{ isAuthenticated, getIdTokenClaims, accessToken, setAccessToken }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider };
export default Context;
