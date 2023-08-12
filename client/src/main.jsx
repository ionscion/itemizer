import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import { Auth0Provider } from "@auth0/auth0-react";
import { ContextProvider } from "./context/context";
import DataTable from "./components/DataTable";
import ContentSection from "./components/ContentSection";
import AboutCard from "./routes/About";
import SupportCard from "./routes/Support";
import AdminPanel from "./routes/AdminPanel";
import BuildR from "./routes/BuildR";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "items",
        element: <ContentSection />,
        // loader: ({ params }) => {
        //   return { id: params.id };
        // },
      },
      {
        path: "list",
        element: <DataTable />,
      },
      {
        path: "about",
        element: <AboutCard />,
      },
      {
        path: "support",
        element: <SupportCard />,
      },
      {
        path: "buildR",
        element: <BuildR />,
      },
      {
        path: "admin",
        element: <AdminPanel />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-za4id1uxfphft08n.us.auth0.com"
    clientId="N7fWtmvKRqB8Ns0gsDpkYTOxZn4VlkiR"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </Auth0Provider>
);
