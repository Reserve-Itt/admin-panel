import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
  Grid,
} from "@material-ui/core";

interface IService {
  serviceName?: string;
  servicePrice?: number;
  serviceDescription?: string;
  serviceDuration?: number;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  media: {
    height: 140,
  },
  deleteButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
});

interface ServiceCardProps {
  service: IService;
  onDelete: (serviceName: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onDelete }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    onDelete(service.serviceName || "");
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const imageUrl = `https://picsum.photos/seed/${service.serviceName}/300/200`;

  return (
      <Card className={classes.root}>
        <CardMedia
            className={classes.media}
            image={imageUrl}
            title={service.serviceName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {service.serviceName}
          </Typography>
          <Typography color="textSecondary">
            Price: {service.servicePrice}
          </Typography>
          <Typography color="textSecondary">
            Duration: {service.serviceDuration} minutes
          </Typography>
          <Typography variant="body2" component="p">
            {service.serviceDescription}
          </Typography>
          <div className={classes.deleteButton}>
            <Button color="secondary" onClick={handleOpen}>
              Delete
            </Button>
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this service?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
  );
};

interface ServiceListProps {
  services: IService[];
  onDelete: (serviceName: string) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onDelete }) => {
  return (
      <Grid container spacing={2}>
        {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.serviceName}>
              <ServiceCard service={service} onDelete={onDelete} />
            </Grid>
        ))}
      </Grid>
  );
};

export default ServiceList;
