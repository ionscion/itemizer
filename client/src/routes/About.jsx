import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Remnant 2 Itemizer
      </Typography>
      <Typography variant="h5" component="div">
        About:
      </Typography>
      <Typography variant="body2">
       A handy way to organize and store your Remnant 2 builds based on ring and amulet powers.
       <br></br>
       Developed by ionscion. 
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Check Out My Other Projects</Button>
    </CardActions>
  </React.Fragment>
);

export default function AboutCard() {
  return (
    <Box sx={{ minWidth: 275 }} className="m-5">
      <Card variant="outlined" className='mt-5'>{card}</Card>
    </Box>
  );
}