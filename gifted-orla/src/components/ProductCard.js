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
          <CardActionArea sx={{ display: "flex", flexDirection: "row" }}>
            <CardMedia
              component="img"
              sx={{ width: "150px" }}
              image={require("./house.jpg")}
              alt="green iguana"
            />
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography variant="h5">{this.props.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {this.props.brand}
              </Typography>
              <Typography>{this.props.price}</Typography>
            </CardContent>
            <CardActions>
              <Button>Learn More</Button>
            </CardActions>
          </CardActionArea>
        </React.Fragment>
      </Card>
    );
  }
}

export default ProductCard;
