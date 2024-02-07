import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom>Word of the Day</Typography>
      <Typography>be-nev-o-lent</Typography>
      <Typography>adjective</Typography>
      <Typography variant="body">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button>Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function ProductCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>{card}</Card>
    </Box>
  );
}
