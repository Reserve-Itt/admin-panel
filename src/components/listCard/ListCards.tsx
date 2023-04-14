import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { IProviderService } from "../../types";

interface IProps {
  Data: IProviderService;
}

export default function ListCard({ Data }: IProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://picsum.photos/140/140"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {Data.serviceName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Service Description: {Data.serviceDescription}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Service Duration: {Data.serviceDuration}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Service Price {Data.servicePrice}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
