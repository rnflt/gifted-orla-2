import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardMedia } from "@mui/material";

class ProductCard extends React.Component {
  render() {
    return (
      <Card>
        <React.Fragment>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography>{this.props.name}</Typography>
              <Typography>{this.props.brand}</Typography>
              <Typography>{this.props.price}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button>Learn More</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    );
  }
}

export default ProductCard;
