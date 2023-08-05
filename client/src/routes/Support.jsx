import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        Support:
      </Typography>
      <Typography variant="body2">
        Please use the links below to support me on Patreon!
      </Typography>
    </CardContent>
    {/* <CardActions>
      <Button size="small">Check Out My Other Projects</Button>
    </CardActions> */}
  </React.Fragment>
);

export default function SupportCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="mt-5">
        {card}
      </Card>
    </Box>
  );
}
