import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

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
  return (
    <Container maxWidth="lg" className="flex flex-row align-end">
      <Grid container spacing={3}>
        {/* Column 1: Ring and Amulet Spots */}

        {/* Column 2: Search Bar */}
        <Grid item xs={12}>
          <div className="flex flex-col m-5">
            <div>
              <h1>Search bar</h1>
            </div>
          </div>
        </Grid>

        {/* Column 3: Data Table */}
        <Grid item xs={8}>
          <div className="flex flex-col m-5">
            <div>
              <h1>Data Table</h1>
            </div>
          </div>
        </Grid>

        {/* Column 1: Ring and Amulet Spots */}
        <Grid item xs={4}>
          <div className="flex flex-col m-5">
            <Paper elevation={3} className="p-4 mb-4">
              {/* Render your ring or amulet image here */}
              Ring 1
            </Paper>
            <Paper elevation={3} className="p-4 mb-4">
              {/* Render your ring or amulet image here */}
              Ring 2
            </Paper>
            <Paper elevation={3} className="p-4 mb-4">
              {/* Render your ring or amulet image here */}
              Ring 3
            </Paper>
            <Paper elevation={3} className="p-4 mb-4">
              {/* Render your ring or amulet image here */}
              Ring 4
            </Paper>
            <Paper elevation={3} className="p-4 mb-4">
              {/* Render your ring or amulet image here */}
              Amulet
            </Paper>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className="flex flex-col m-5">
            <Paper elevation={3} className="p-4 mb-4">
              {/* Render your ring or amulet image here */}
              Printout of current stats
            </Paper>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BuildR;
