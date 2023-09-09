import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [user_id, setUser_id] = useState(null);
  const [userToken, setUserToken] = useState(null); 
  const [accessToken, setAccessToken] = useState(null);
  const [ringApiInfo, setRingApiInfo] = useState(null);
  const [amuletApiInfo, setAmuletApiInfo] = useState(null);
  const [keywordApiInfo, setKeywordApiInfo] = useState(null);
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [builderRings, setBuilderRings] = useState([]);
  const [builderAmulets, setBuilderAmulets] = useState([]);
  const { user } = useAuth0();
  const roles = user && user["app.com/roles"];
  const isSuperUser = roles && roles.includes("Admin");
  const [ringCount, setRingCount] = useState(0);
  const [amuletCount, setAmuletCount] = useState(0);

  useEffect(() => {
    console.log("builderRings", builderRings);
  }, [builderRings]);

  // useEffect(() => {
  //   console.log("ringCount", ringCount);
  // }, [ringCount]);

  useEffect(() => {
    if (isAuthenticated) {
      getToken();
    }
  }, [getIdTokenClaims, isAuthenticated]);

  useEffect(() => {
    if (accessToken) {
      const userToken = jwt_decode(accessToken);
      const user_id = jwt_decode(accessToken).sub.slice(6);
      setUser_id(user_id);
      setUserToken(userToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (user_id || userToken) {
      console.log("user_id", user_id);
      console.log("userToken", userToken);
    }
  }, [user_id, userToken]);

  const getToken = async () => {
    const token = await getIdTokenClaims();
    setAccessToken(token.__raw);
  };

  const getAllRings = async () => {
    try {
      const response = await fetch("/api/rings");
      const data = await response.json();
      setRingApiInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleRing = async (id) => {
    try {
      const response = await fetch(`/api/rings/${id}`);
      const data = await response.json();
      setBuilderRings((prev) => [...prev, data]);
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

  const getSingleAmulet = async (id) => {
    try {
      const response = await fetch(`/api/amulets/${id}`);
      const data = await response.json();
      setBuilderAmulets((prev) => [...prev, data]);
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

  const getItemsByKeyword = async (keyword) => {
    try {
      const response = await fetch(`/api/keywords/name/${keyword}`);
      const data = await response.json();
      // console.log(data);
      setSearch(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addRing = async (name, description, keywords, imgUrl) => {
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
          imgUrl: imgUrl,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAmulet = async (name, description, keywords, imgUrl) => {
    try {
      const response = await fetch("/api/amulets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          keywords: keywords, // Pass the array of keywords directly
          imgUrl: imgUrl,
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
    getSingleRing,
    ringApiInfo,
    amuletApiInfo,
    getSingleAmulet,
    isAuthenticated,
    getIdTokenClaims,
    accessToken,
    getAllKeywords,
    keywordApiInfo,
    addRing,
    addAmulet,
    isSuperUser,
    user,
    selectedKeyword,
    setSelectedKeyword,
    getItemsByKeyword,
    search,
    setSearch,
    setBuilderRings,
    builderRings,
    ringCount,
    setRingCount,
    amuletCount,
    setAmuletCount,
    builderAmulets,
    setBuilderAmulets,
  };

  return <Context.Provider value={valueToShare}>{children}</Context.Provider>;
};

export { ContextProvider };
export default Context;
