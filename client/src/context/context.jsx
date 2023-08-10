import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [ringApiInfo, setRingApiInfo] = useState(null);
  const [amuletApiInfo, setAmuletApiInfo] = useState(null);
  const [keywordApiInfo, setKeywordApiInfo] = useState(null);

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

  const addRingWithImage = async (name, description, keywords) => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('keywords', keywords); // No need to stringify
        // formData.append('img', img);

        const response = await fetch("/api/rings", {
            method: "POST",
            body: formData,
            headers: {
              'Accept': 'multipart/form-data',
            }
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

const addRing = async (name, description, keywords) => {
  try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('keywords', keywords); // No need to stringify

      const response = await fetch("/api/rings", {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'multipart/form-data',
          }
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
  };

  return <Context.Provider value={valueToShare}>{children}</Context.Provider>;
};

export { ContextProvider };
export default Context;
