import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  serviceName?: string;
  serviceDuration?: number;
  serviceDescription?: string;
  servicePrice?: number;
}

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: "1rem",
    marginLeft: 0,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  duration: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "0.5rem",
  },
  description: {
    fontSize: "1rem",
    marginBottom: "1rem",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
});

const ServicesListCard: React.FC<IProps> = ({
  serviceName,
  serviceDuration,
  serviceDescription,
  servicePrice,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}>{serviceName}</Typography>
        <Typography className={classes.duration}>
          {serviceDuration} minutes
        </Typography>
        <Typography className={classes.description}>
          {serviceDescription}
        </Typography>
        <Typography className={classes.price}>${servicePrice}</Typography>
      </CardContent>
    </Card>
  );
};

export default ServicesListCard;