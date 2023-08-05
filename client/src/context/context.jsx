import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [ringApiInfo, setRingApiInfo] = useState(null);
  const [amuletApiInfo, setAmuletApiInfo] = useState(null);

  const getAllRings = async () => {
    try {
      const response = await fetch("/api/rings");
      const data = await response.json();
      setRingApiInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAmulets = async () => {
    try {
      const response = await fetch("/api/amulets");
      const data = await response.json();
      setAmuletApiInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRings();
    getAllAmulets();
  }, []);

  const valueToShare = {
    getAllRings,
    ringApiInfo,
    amuletApiInfo,
    isAuthenticated,
    getIdTokenClaims,
    accessToken,
  };

  return <Context.Provider value={valueToShare}>{children}</Context.Provider>;
};

export { ContextProvider };
export default Context;
