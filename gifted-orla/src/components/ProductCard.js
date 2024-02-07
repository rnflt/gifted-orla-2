import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const card = ({ id, brand, name, price }) => {
  return (
    <React.Fragment>
      <CardContent>
        <Typography gutterBottom>{name}</Typography>
        <Typography>be-nev-o-lent</Typography>
        <Typography>{brand}</Typography>
        <Typography variant="body">
          well meaning and kindly.
          <br />
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button>Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
};

class ProductCard extends React.Component {
  render() {
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card>
          <React.Fragment>
            <CardContent>
              <Typography gutterBottom>{this.props.name}</Typography>
              <Typography>{this.props.brand}</Typography>
              <Typography variant="body">
                well meaning and kindly.
                <br />
                {this.props.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button>Learn More</Button>
            </CardActions>
          </React.Fragment>
        </Card>
      </Box>
    );
  }
}

export default ProductCard;
