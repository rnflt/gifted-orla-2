import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DropdownLists from "./DropdownLists";

const ProductCard = (props) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "row" }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "150px" }}
          image={require("../assets/house.jpg")}
          alt="green iguana"
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h5">{props.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {props.brand}
          </Typography>
          <Typography>{props.price}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", flexDirection: "column" }}>
        <DropdownLists product={props} />
        <IconButton><MoreHorizIcon /></IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
