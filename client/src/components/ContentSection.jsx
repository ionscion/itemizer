import React from "react";
import Box from "@mui/material/Box";
import DataTable from "./DataTable";
import Container from "@mui/material/Container";
import { useContext } from "react";
import Context from "../context/context";
import TitlebarImageList from "../components/ImageList";

function ContentSection() {
  const { ringApiInfo, amuletApiInfo } = useContext(Context);

  return (
    <Container maxWidth="lg" className="mx-10 flex flex-col items-center">
      <div className="mt-5">
        <h1 className="text-center">Content Section</h1>
      </div>
      {/* <DataTable /> */}
      {/* <div>
        <h1 className="text-center">Amulets Baby</h1>
        {amuletApiInfo?.map((ring) => {
          return (
            <div key={ring.id}>
              <h1>{ring.name}</h1>
              <p>{ring.description}</p>
            </div>
          );
        })}
      </div> */}
      <div className="flex flex-col items-center">
        {/* <h1 className="text-center">Image List</h1> */}
        <TitlebarImageList />
      </div>
    </Container>
  );
  
}

export default ContentSection;
