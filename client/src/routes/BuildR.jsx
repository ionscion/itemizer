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

function BuildR() {
  const {
    selectedKeyword,
    setSelectedKeyword,
    setSelectedRing,
    setSelectedAmulet,
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
    keywordApiInfo,
    ringApiInfo,
    amuletApiInfo,
    setRows,
    saveBuild
  } = useCustomContext();

  const handleClearBuild = () => {
    setBuilderRings([]);
    setBuilderAmulets([]);
    setAmuletCount(0);
    setRingCount(0);
  };

  const handleSaveBuild = () => {
    const ringIds = builderRings?.map((item) => item.id);
    const amuletId = builderAmulets?.[0].id;  
    console.log("ringIds", ringIds);
    console.log("amuletId", amuletId);
    saveBuild(ringIds, amuletId);
  };

  //These 3 set the respective items to State which passes to the General Data grid
  const handleKeywordChange = (event, value) => {
    setRows([]);
    setSelectedAmulet("");
    setSelectedRing("");
    setSelectedKeyword(value);
  };

  const handleRingChange = (event, value) => {
    setRows([]);
    setSelectedAmulet("");
    setSelectedKeyword("");
    setSelectedRing(value);
  };

  const handleAmuletChange = (event, value) => {
    setRows([]);
    setSelectedKeyword("");
    setSelectedRing("");
    setSelectedAmulet(value);
  };

  return (
    <Container maxWidth="lg" className="flex flex-row align-end">
      <Grid container spacing={3}>
        {/* Column 1: Ring and Amulet Spots */}

        {/* Column 2: Search Bar */}
        <Grid item xs={12}>
          <div className="flex m-5 space-x-4">
            <SearchBar
              label="Search Keywords"
              options={keywordApiInfo?.map((option) => option.keyword)}
              onChange={handleKeywordChange}
              apiInfo={keywordApiInfo}
            />
            <SearchBar
              label="Search Rings"
              options={ringApiInfo?.map((option) => option.name)}
              onChange={handleRingChange}
              apiInfo={ringApiInfo}
            />
            <SearchBar
              label="Search Amulets"
              options={amuletApiInfo?.map((option) => option.name)}
              onChange={handleAmuletChange}
              apiInfo={amuletApiInfo}
            />
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
              <Typography>Current Stats</Typography>
              {builderRings?.length > 0 && (
                <div>
                  <Typography>Ring Stats</Typography>
                  {builderRings?.map((item) => (
                    <p key={item.id}>
                      <span>{item.name}:</span> {item.description}
                    </p>
                  ))}
                </div>
              )}
              {builderAmulets?.length > 0 && (
                <div>
                  <Typography>Amulet Stats</Typography>
                  {builderAmulets?.map((item) => (
                    <p key={item.id}>
                      <span>{item.name}:</span> {item.description}
                    </p>
                  ))}
                </div>
              )}
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
              {(builderRings.length > 0 || builderAmulets.length > 0) && (
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

            {/* Nested Grid for Ring Images */}
            <Grid container spacing={2}>
              {builderRings?.map((item) => (
                <Grid item xs={6} key={item.id}>
                  <Paper elevation={3} className="p-4 m-4">
                    <p className="text-sm">{item.name}</p>
                    <img
                      src={`/images/${item.imgUrl}.png?w=124&fit=crop&auto=format`}
                      alt={item.name}
                      loading="lazy"
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
            {builderAmulets?.length > 0 && 
            <div className="flex flex-col m-5">
              <Typography>Amulet</Typography>
              {builderAmulets?.map((item) => {
                return (
                  <Paper elevation={3} className="p-4 mb-4" key={item.id}>
                    {item.name}
                    <img
                      src={`/images/${item.imgUrl}.png?w=124&fit=crop&auto=format`}
                      alt={item.name}
                      loading="lazy"
                    />
                  </Paper>
                );
              })}
            </div>
            }
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BuildR;
