import { useState } from "react";
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { useAuth0 } from "@auth0/auth0-react";
import ResponsiveAppBar from "./components/AppBar";

function App(props) {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  return (
    <>
      {/* <h1>Remnant 2 Itemizer</h1> */}
      <ResponsiveAppBar />
      {isAuthenticated && (
        <div>
          <h2>Logged in</h2>
        </div>
      )}
    </>
  );
}

export default App;
