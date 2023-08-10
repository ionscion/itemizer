import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user } = useAuth0();
  console.log(user);

  const roles = user && user["app.com/roles"];
  const isSuperUser = roles && roles.includes("Admin");
  console.log(isSuperUser);
  return (
    <>
      {isSuperUser && (
        <div>
          Hello {user?.nickname ?? `wait for it...`}, welcome to the Admin Panel
        </div>
      )}
      {!isSuperUser && (
        <div>
          You are not authorized to view this page. Please contact an admin to
          request access.
        </div>
      )}
    </>
  );
}

export default Profile;
