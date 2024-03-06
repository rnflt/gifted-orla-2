import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";


const ListCard = (props) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "row" }}>
        <CardActionArea
          sx={{display: "flex", flexDirection: "row",}}
          component={Link}
          to={"/list/" + props.id}
        >
          <CardMedia
            component="img"
            sx={{ width: "150px" }}
            image={require("../assets/house.jpg")}
            alt="green iguana"
          />
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h5">{props.name}</Typography>
          </CardContent>
        </CardActionArea>
    </Card>
  );
};

export default ListCard;
