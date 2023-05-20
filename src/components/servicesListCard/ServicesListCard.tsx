import { Card, CardContent, Typography } from "@material-ui/core";
import { FC } from "react";

interface IProps {
  serviceName: string;
  serviceDuration: number;
  serviceDescription: string;
  servicePrice: number;
}

const ServicesListCard: React.FC<IProps> = ({
  serviceName,
  serviceDuration,
  serviceDescription,
  servicePrice,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {serviceName}
        </Typography>
        <Typography color="textSecondary">{serviceDuration} minutes</Typography>
        <Typography variant="body2" component="p">
          {serviceDescription}
        </Typography>
        <Typography variant="h6" component="p">
          ${servicePrice}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ServicesListCard;
