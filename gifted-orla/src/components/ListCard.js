import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

import { Link } from "react-router-dom";

class ListCard extends React.Component {
  render() {
    return (
      <Card sx={{ display: "flex", flexDirection: "row" }}>
        <React.Fragment>
          <CardActionArea
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
            component={Link}
            to={"/list/" + this.props.id}
          >
            <CardMedia
              component="img"
              sx={{ width: "150px" }}
              image={require("../assets/house.jpg")}
              alt="green iguana"
            />
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography variant="h5">{this.props.name}</Typography>
            </CardContent>
          </CardActionArea>
        </React.Fragment>
      </Card>
    );
  }
}

export default ListCard;
