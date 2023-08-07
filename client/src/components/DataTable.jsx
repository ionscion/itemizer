import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import useCustomContext from "../hooks/useCustomContext";
import Container from "@mui/material/Container";
import { useEffect } from "react";

const columns2 = [
  { field: "id", headerName: "ID", width: 70 },
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

  return (
    <Container maxWidth="lg" className="mx-10 flex flex-col items-center">
      <div className="mt-5">
        <h1 className="text-center">Builds</h1>
      </div>

      <div style={{ height: 400, width: "100%" }}>
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
      </div>
    </Container>
  );
}
