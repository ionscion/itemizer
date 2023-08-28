import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import useCustomContext from "../hooks/useCustomContext";
import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";

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

export default function GeneralDataGrid() {
  const {
    selectedKeyword,
    setSelectedKeyword,
    getItemsByKeyword,
    search,
    setBuilderRings,
    getSingleRing,
    ringCount,
    setRingCount,
  } = useCustomContext();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState("");
  const [selectName, setSelectName] = useState("");
  const [type, setType] = useState("");

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
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          type: "Amulet",
        };
      });

      const formattedRings = ringsArray?.map((item) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          type: "Ring",
        };
      });

      setRows([...formattedAmulets, ...formattedRings]);
    }
  }, [search]);

  //need to add limit to 4 rings
  const handleAdd = (id) => {
    console.log("add");
    if (type === "Ring") {
      if (ringCount < 4) {
        getSingleRing(id);
        setRingCount((prev) => prev + 1);
      } else {
        //TODO add some sort of error message
        console.log("too many rings");
      }
    } else {
      console.log("amulet");
    }
    handleClose();
  };

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
        onRowClick={(params) => {
          setId(params.row.id);
          setSelectName(params.row.name);
          setType(params.row.type);
          handleOpen();
        }}
      />
      <ConfirmModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleAdd={handleAdd}
        id={id}
        selectName={selectName}
        type={type}
      />
    </Box>
  );
}
