import { useContext } from "react";
import Context from "../context/context";

function useCustomContext() {
  const context = useContext(Context);
  return context;
}

export default useCustomContext;