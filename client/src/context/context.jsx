import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [apiInfo, setApiInfo] = useState(null);

  const getAllRings = async () => {
    try {
      const response = await fetch("/api/rings");
      const data = await response.json();
      setApiInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRings();
  }, []);

  const valueToShare = {
    getAllRings,
    apiInfo,
    isAuthenticated,
    getIdTokenClaims,
    accessToken,
  };

  return <Context.Provider value={valueToShare}>{children}</Context.Provider>;
};

export { ContextProvider };
export default Context;
