import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import useCustomContext from "../hooks/useCustomContext";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const columns2 = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "description", headerName: "Description", width: 500 },
  {
    field: "keywords",
    headerName: "Keywords",
    width: 300,
    valueGetter: (params) =>
      `${params.row.keywords
        .map((item) => `${item.keyword} ${item.damageValue ?? ""}`)
        .join(", ")
        .trim()}`,
  },
];

//id, name, description

export default function DataTable() {
  const { ringApiInfo, amuletApiInfo } = useCustomContext();
  const [rows2, setRows2] = React.useState([]);
  const [rows3, setRows3] = React.useState([]);
  const [showRings, setShowRings] = useState(true);
  const [showAmulets, setShowAmulets] = useState(false);

  const handleShowRings = () => {
    setShowRings(true);
    setShowAmulets(false);
  };

  const handleShowAmulets = () => {
    setShowRings(false);
    setShowAmulets(true);
  };

  useEffect(() => {
    // Check if ringApiInfo is available
    if (ringApiInfo) {
      console.log(ringApiInfo);
      // Update rows2 with the mapped data
      setRows2(
        ringApiInfo.map((item) => {
          // Map over the keywords array for each item and create formatted keyword information
          const keywordsInfo = item.keywords.map((keywordItem) => ({
            keyword: keywordItem.keyword,
            damageValue: keywordItem.ring_keyword.damageValue,
          }));

          return {
            id: item.id,
            name: item.name,
            description: item.description,
            keywords: keywordsInfo, // Include the formatted keywords in the object
          };
        })
      );
    }
  }, [ringApiInfo]);

  useEffect(() => {
    // Check if ringApiInfo is available
    if (amuletApiInfo) {
      setRows3(
        amuletApiInfo.map((item) => {
          // Map over the keywords array for each item and create formatted keyword information
          const keywordsInfo = item.keywords.map((keywordItem) => ({
            keyword: keywordItem.keyword,
            damageValue: keywordItem.amulet_keyword.damageValue,
          }));

          return {
            id: item.id,
            name: item.name,
            description: item.description,
            keywords: keywordsInfo, // Include the formatted keywords in the object
          };
        })
      );
    }
  }, [amuletApiInfo]);

  return (
    <Container maxWidth="lg" className="mx-10 flex flex-col items-center">
      <div className="mt-5">
        <h1 className="text-center">Full Item Details</h1>
      </div>
      <div className="flex flex-col items-center mt-5 mb-5">
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handleShowRings}>
            Rings
          </Button>
          <Button variant="outlined" onClick={handleShowAmulets}>
            Amulets
          </Button>
        </Stack>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        {showRings && (
          <DataGrid
            className="mt-5"
            rows={rows2}
            columns={columns2}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
        {showAmulets && (
          <DataGrid
            className="mt-5"
            rows={rows3}
            columns={columns2}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
      </div>
    </Container>
  );
}
