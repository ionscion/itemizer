import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import useCustomContext from "../hooks/useCustomContext";
import acidRingPic from "../assets/acid-stone-ring.png";
import BasicModal from "./BasicModal";
import { useState, useEffect } from "react";

export default function TitlebarImageList() {
  const { ringApiInfo } = useCustomContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemName, setItemName] = useState(null);

  // const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

  useEffect(() => {
    if (ringApiInfo) {
      ringApiInfo.map((item) => {
        console.log(item);
        console.log(item.img); // Log the blob data
        console.log(typeof item.img); // Log the data type
        console.log(URL.createObjectURL(new Blob([item.img]))); // Log the URL
      });
    }
  }, [ringApiInfo]);

  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      {/* <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Rings</ListSubheader>
      </ImageListItem> */}
      {ringApiInfo?.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={acidRingPic}
            alt={item.name}
            loading="lazy"
          />

          <ImageListItemBar
            title={item.name}
            // subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.name}`}
                onClick={() => {
                  // Set the selected item data when clicking the info button
                  setSelectedItem(item.description);
                  setItemName(item.name);
                  handleOpen(); // Open the modal
                }}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
      <BasicModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        selectedItem={selectedItem}
        itemName={itemName}
      />
    </ImageList>
  );
}
