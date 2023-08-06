import React from "react";
import Container from "@mui/material/Container";
import { useContext } from "react";
import Context from "../context/context";
import TitlebarImageList from "./ImageList";

function ContentSection() {
  const { ringApiInfo, amuletApiInfo } = useContext(Context);

  return (
    <Container maxWidth="lg" className="mx-10 flex flex-col items-center">
      <div className="mt-5">
        <h1 className="text-center">Rings and Amulets</h1>
      </div>
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
        <TitlebarImageList />
      </div>
    </Container>
  );
  
}

export default ContentSection;
