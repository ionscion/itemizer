import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SearchBar from "../components/SearchBar";
import GeneralDataGrid from "../components/GeneralDataGrid";
import useCustomContext from "../hooks/useCustomContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// BuildR Feature
// - I want to view a list of all amulets and rings and be able to sort them by keywords
// - Add up to 4 rings
// - Add 1 amulet
// - See a printout of current stats based on selected items
// - See each items description next to selection

// Need some sort of search function by keywords -> see all rings or amulets that match the search result
// - can probably use current data table
// - Component on right of screen with 4 ring spots, 1 amulet.
// - Clicking on ring/amulet transfers or adds to the right spot

//could have a search bar on top of the data table that filters the data table based on the search result
//could have data table on left side of screen, and then a component on right side of screen that shows the selected items

function BuildR() {
  const {
    selectedKeyword,
    setSelectedKeyword,
    getItemsByKeyword,
    search,
    setBuilderRings,
    builderRings,
    ringCount,
    setRingCount,
    amuletCount,
    setAmuletCount,
    builderAmulets,
    setBuilderAmulets,
  } = useCustomContext();

  const handleClearBuild = () => {
    setBuilderRings([]);
    setBuilderAmulets([]);
    setAmuletCount(0);
    setRingCount(0);
  };

  const handleSaveBuild = () => {
    console.log("save build");
  };

  return (
    <Container maxWidth="lg" className="flex flex-row align-end">
      <Grid container spacing={3}>
        {/* Column 1: Ring and Amulet Spots */}

        {/* Column 2: Search Bar */}
        <Grid item xs={12}>
          <div className="flex flex-col m-5">
            <SearchBar />
          </div>
        </Grid>

        {/* Column 3: Data Table */}
        <Grid item xs={12}>
          <div className="flex flex-col m-5">
            <div>
              <GeneralDataGrid />
            </div>
          </div>
        </Grid>

        <Grid item xs={8}>
          <div className="flex flex-col m-5">
            <Paper elevation={3} className="p-4 mb-4">
              {/* Render your ring or amulet image here */}
              Printout of current stats
            </Paper>
          </div>
        </Grid>

        {/* Column 1: Ring and Amulet Spots */}
        <Grid item xs={4}>
          <div className="flex flex-col m-5">
            <div className="flex flex-row m-5 justify-center">
              <div>
                <Typography>Current Build</Typography>
                <Typography>Rings:{ringCount}/4 </Typography>
                <Typography>Amulets:{amuletCount}/1 </Typography>
              </div>
              {(builderRings.length > 0 || builderAmulets.length >0 )&& (
                <>
                  <div>
                    <Button onClick={handleClearBuild}>Clear Build</Button>
                  </div>
                  <div>
                    <Button onClick={handleSaveBuild}>Save Build</Button>
                  </div>
                  </>
                )}
            </div>
            <div className="flex flex-col m-5">
              {builderRings?.map((item) => {
                return (
                  <Paper elevation={3} className="p-4 m-4" key={item.id}>
                    {item.name}
                    <img
                      src={`/images/${item.imgUrl}.png?w=124&fit=crop&auto=format`}
                      // srcSet={`${item.imgUrl || acidRingPic}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.name}
                      loading="lazy"
                    />
                  </Paper>
                );
              })}
            </div>
            <div className="flex flex-col m-5">
              {builderAmulets?.map((item) => {
                return (
                  <Paper elevation={3} className="p-4 mb-4" key={item.id}>
                    {item.name}
                    <img
                      src={`/images/${item.imgUrl}.png?w=124&fit=crop&auto=format`}
                      // srcSet={`${item.imgUrl || acidRingPic}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.name}
                      loading="lazy"
                    />
                  </Paper>
                );
              })}
            </div>
          </div>
        </Grid>

       
      </Grid>
    </Container>
  );
}

export default BuildR;
