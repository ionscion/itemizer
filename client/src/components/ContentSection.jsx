import React from "react";
import Box from "@mui/material/Box";
import DataTable from "./DataTable";
import Container from "@mui/material/Container";

function ContentSection() {
  return (
    <Container maxWidth="lg" className="mx-10">
      <DataTable />

      <div className="mt-5">
        <h1 className="text-sm">Content Section</h1>
      </div>
    </Container>
  );
}

export default ContentSection;
