import React from 'react'
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function ButtonChoice() {
  return (
    <div className="flex flex-col items-center mt-5 mb-5">
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" >
            Rings
          </Button>
          <Button variant="outlined">
            Amulets
          </Button>
        </Stack>
      </div>
  )
}

export default ButtonChoice