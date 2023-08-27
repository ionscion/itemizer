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

export default function ConfirmModal({ open, handleClose, id, handleAdd, selectName }) {
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
            {selectName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you wish to add this ring to your build?
          </Typography>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleAdd(id)}>Add</Button>
        </Box>
      </Modal>
    </div>
  );
}
