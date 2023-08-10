import React from "react";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import Context from "../context/context";
import RingImageList from "./RingImageList";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AmuletImageList from "./AmuletImageList";

function ContentSection() {
  const [showRings, setShowRings] = useState(true);
  const [showAmulets, setShowAmulets] = useState(false);

  const handleShowRings = () => {
    setShowRings(true);
    setShowAmulets(false);
  };

  const handleShowAmulets = () => {
    setShowRings(false);
    setShowAmulets(true);
  };

  return (
    <Container maxWidth="lg" className="mx-10 flex flex-col items-center">
      <div className="mt-5">
        <h1 className="text-center">Rings and Amulets</h1>
      </div>
      <div className="flex flex-col items-center mt-5 mb-5">
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handleShowRings}>
            Rings
          </Button>
          <Button variant="outlined" onClick={handleShowAmulets}>
            Amulets
          </Button>
        </Stack>
      </div>
      {showRings && (
        <div className="flex flex-col items-center">
          <RingImageList />
        </div>
      )}

      {showAmulets && (
        <div className="flex flex-col items-center">
          <AmuletImageList />
        </div>
      )}
    </Container>
  );
}

export default ContentSection;
