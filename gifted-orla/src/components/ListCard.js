import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardMedia } from "@mui/material";

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
          >
            <CardMedia
              component="img"
              sx={{ width: "150px" }}
              image={require("./house.jpg")}
              alt="green iguana"
            />
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography variant="h5">{this.props.name}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ display: "flex", flexDirection: "column" }}>
            <Button>View List</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    );
  }
}

export default ListCard;
