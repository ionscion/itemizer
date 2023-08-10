import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [ringApiInfo, setRingApiInfo] = useState(null);
  const [amuletApiInfo, setAmuletApiInfo] = useState(null);
  const [keywordApiInfo, setKeywordApiInfo] = useState(null);
  const { user } = useAuth0();
  const roles = user && user['app.com/roles'];
  const isSuperUser = roles && roles.includes("Admin");

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

  const getAllKeywords = async () => {
    try {
      const response = await fetch("/api/keywords");
      const data = await response.json();
      setKeywordApiInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addRing = async (name, description, keywords) => {
    try {
      const response = await fetch("/api/rings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          keywords: keywords, // Pass the array of keywords directly
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRings();
    getAllAmulets();
    getAllKeywords();
  }, []);

  const valueToShare = {
    getAllRings,
    ringApiInfo,
    amuletApiInfo,
    isAuthenticated,
    getIdTokenClaims,
    accessToken,
    getAllKeywords,
    keywordApiInfo,
    addRing,
    isSuperUser,
    user
  };

  return <Context.Provider value={valueToShare}>{children}</Context.Provider>;
};

export { ContextProvider };
export default Context;
