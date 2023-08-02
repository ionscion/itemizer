import React from "react";
import Box from "@mui/material/Box";
import DataTable from "./DataTable";
import Container from "@mui/material/Container";
import { useContext } from "react";
import Context from "../context/context";

function ContentSection() {
  const { apiInfo } = useContext(Context);

  // const ringData = apiInfo?.map((ring) => {
  //     return {
  //         name: ring.name,
  //         description: ring.description,
  //     };
  // });

  return (
    <Container maxWidth="lg" className="mx-10">
      <div className="mt-5">
        <h1 className="text-center">Content Section</h1>
      </div>
      <DataTable />
      <div>
        <h1 className="text-center">Rings Baby</h1>
        {apiInfo?.map((ring) => {
          return (
            <div key={ring.id}>
              <h1>{ring.name}</h1>
              <p>{ring.description}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default ContentSection;
