import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";

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

export default function SaveBuildModal({ open, handleClose, handleSaveBuild }) {
  const [buildName, setBuildName] = useState("");
  const [buildDesc, setBuildDesc] = useState("");
  const isButtonDisabled = !buildName || !buildDesc;

  const handleSave = () => {
    handleSaveBuild(buildName, buildDesc);
    setBuildDesc("");
    setBuildName("");
  }

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
            Save Your Build!
          </Typography>

          <TextField
            required
            id="buildName"
            label="Required"
            placeholder="Build Name"
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            helperText="Please enter a build name."
          />
          <TextField
            required
            id="desc"
            label="Required"
            placeholder="Build Description"
            value={buildDesc}
            onChange={(e) => setBuildDesc(e.target.value)}
            helperText="Please enter a description."
          />
          <div className="flex">
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              disabled={isButtonDisabled}
              onClick={() => handleSave()}
            >
              Save Build
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
