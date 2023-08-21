import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import useCustomContext from "../hooks/useCustomContext";
import { useEffect, useState } from "react";

const columns = [
  // { field: "id", headerName: "ID", width: 30 },
  { field: "type", headerName: "Type", width: 70 },
  { field: "name", headerName: "Name", width: 160 },
  { field: "description", headerName: "Description", width: 1000 },

  // {
  //   field: "keywords",
  //   headerName: "Keywords",
  //   width: 300,
  //   valueGetter: (params) =>
  //     `${params.row.keywords
  //       .map((item) => `${item.keyword} ${item.damageValue ?? ""}`)
  //       .join(", ")
  //       .trim()}`,
  // },
];

// const rows = [
//   {
//     id: 1,
//     name: "Testdata",
//     description: "afsdfljasfljsdlfl",
//     keywords: [{ keyword: "test", damageValue: 1 }],
//   },
// ];

export default function GeneralDataGrid() {
  const { selectedKeyword, setSelectedKeyword, getItemsByKeyword, search } =
    useCustomContext();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (selectedKeyword) {
      getItemsByKeyword(selectedKeyword);
    }
  }, [selectedKeyword]);

  useEffect(() => {
    if (search) {
      console.log("searcharray", search);

      const amuletsArray = Object.values(search.amulets);
      const ringsArray = Object.values(search.rings);
      console.log("amuletsArray", amuletsArray);
      console.log("ringsArray", ringsArray);

      const formattedAmulets = amuletsArray?.map((item) => {
        // Map over the keywords array for each item and create formatted keyword information
        // const keywordsInfo = item.amulet_keyword.map((keywordItem) => ({
        //   keyword: keywordItem.keyword,
        //   damageValue: keywordItem.amulet_keyword.damageValue,
        // }));

        return {
          id: item.id,
          name: item.name,
          description: item.description,
          // keywords: keywordsInfo,
          type: "Amulet",
        };
      });

      const formattedRings = ringsArray?.map((item) => {
        // Map over the keywords array for each item and create formatted keyword information
        // const keywordsInfo = item.keywords.map((keywordItem) => ({
        //   keyword: keywordItem.keyword,
        //   damageValue: keywordItem.ring_keyword.damageValue,
        // }));

        return {
          id: item.id,
          name: item.name,
          description: item.description,
          // keywords: keywordsInfo,
          type: "Ring",
        };
      });

      setRows([...formattedAmulets, ...formattedRings]);
    }
  }, [search]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rowHeight={50}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
