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
    amuletCount,
    setAmuletCount,
    getSingleAmulet,
    builderRings,
    builderAmulets,
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

  // const handleAdd = (id) => {
  //   if (type === "Ring") {
  //     if (builderRings.find((item) => item.id === id)) {
  //       console.log("already added");
  //       return;
  //     } else {
  //       if (ringCount < 4) {
  //         getSingleRing(id);
  //         setRingCount((prev) => prev + 1);
  //       } else {
  //         //TODO add some sort of error message
  //         console.log("too many rings");
  //       }
  //     }
  //   } else {
  //     if (builderAmulets.find((item) => item.id === id)) {
  //       console.log("already added");
  //       return;
  //     } else {
  //       if (amuletCount < 1) {
  //         getSingleAmulet(id);
  //         setAmuletCount((prev) => prev + 1);
  //       } else {
  //         //TODO add some sort of error message
  //         console.log("too many amulets");
  //       }
  //     }
  //   }
  //   handleClose();
  // };

  const handleAdd = (id) => {
    if (type === "Ring") {
      handleRingAdd(id);
    } else {
      handleAmuletAdd(id);
    }
    handleClose();
  };

  const handleRingAdd = (id) => {
    const existingRing = builderRings.find((item) => item.id === id);
    if (existingRing) {
      console.log("Ring is already added");
      return;
    }

    if (ringCount < 4) {
      getSingleRing(id);
      setRingCount((prev) => prev + 1);
    } else {
      console.log("Too many rings");
    }
  };

  const handleAmuletAdd = (id) => {
    const existingAmulet = builderAmulets.find((item) => item.id === id);
    if (existingAmulet) {
      console.log("Amulet is already added");
      return;
    }

    if (amuletCount < 1) {
      getSingleAmulet(id);
      setAmuletCount((prev) => prev + 1);
    } else {
      console.log("Too many amulets");
    }
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
