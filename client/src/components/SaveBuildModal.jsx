import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
  //TODO: add build name and description
  //TODO: create error message if user is not logged in or hide the save button until they are logged in

export default function SaveBuildModal({ open, handleClose, handleSaveBuild}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you wish to save your build?
          </Typography>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSaveBuild()}>Save Build</Button>
        </Box>
      </Modal>
    </div>
  );
}
