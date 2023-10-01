import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import  useCustomContext from "../hooks/useCustomContext";
import acidRingPic from "/images/acid-stone-ring.png"
import BasicModal from './BasicModal';
import {useState} from "react";

export default function RingImageList() {
const { ringApiInfo } = useCustomContext();
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [selectedItem, setSelectedItem] = useState(null);
const [itemName, setItemName] = useState(null);



  return (
    <ImageList sx={{ width: 1000, height: 450 }} cols={4}>
      {/* <ImageListItem key="Subheader" cols={4}>
        <ListSubheader component="div">Rings</ListSubheader>
      </ImageListItem> */}
      {ringApiInfo?.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={`/images/${item.imgUrl}.png?w=248&fit=crop&auto=format`}
            // srcSet={`${item.imgUrl || acidRingPic}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            // subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
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
      <BasicModal open={open} handleOpen={handleOpen} handleClose={handleClose} selectedItem={selectedItem} itemName={itemName}/>
    </ImageList>
  );
}

