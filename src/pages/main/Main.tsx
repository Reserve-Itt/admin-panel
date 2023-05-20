import React, { Children, useEffect, useState } from "react";
import "./Main.css";
import Sidebar from "../Sidebar/Sidebar";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaComment,
  FaUsers,
  FaMoneyBillAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import {
  useListCommentsQuery,
  useListServicesQuery,
} from "../../services/ApiService/authApi";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { SelectAuth } from "../../features";
import { IProviderService } from "../../types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ListCard } from "../../components";
import { useNavigate } from "react-router";

const useStyles2 = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    borderBottom: "1px solid",
    borderColor: theme.palette.grey[300],
  },
  date: {
    fontSize: "12px",
    color: theme.palette.text.secondary,
  },
  point: {
    fontSize: "14px",
    fontWeight: "bold",
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
  },
  description: {
    fontSize: "14px",
    color: theme.palette.text.primary,
  },
  author: {
    fontSize: "12px",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
  },
  stars: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: theme.palette.text.primary,
    marginTop: theme.spacing(0.5),
  },
  starIcon: {
    fontSize: "16px",
    color: "#FDB813",
    marginRight: theme.spacing(0.5),
  },
  button: {
    margin: theme.spacing(2, 0),
  },
}));
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
  list: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
  },
  listItem: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
}));

let services: Array<IProviderService> = [
  {
    serviceDescription: "",
    serviceDuration: 0,
    serviceName: "",
    servicePrice: 0,
  },
  {
    serviceDescription: "",
    serviceDuration: 0,
    serviceName: "",
    servicePrice: 0,
  },
  {
    serviceDescription: "",
    serviceDuration: 0,
    serviceName: "",
    servicePrice: 0,
  },
];

const comments = [
  {
    id: 1,
    date: "Mar 17",
    point: 10,
    author: "John Doe",
    stars: 4,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    date: "Mar 16",
    point: 5,
    author: "Jane Smith",
    stars: 3,
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    date: "Mar 15",
    point: 8,
    author: "Bob Johnson",
    stars: 5,
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];
const ModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Main: React.FC = ({}) => {
  const classes = useStyles();
  const classes2 = useStyles2();

  const navigate = useNavigate();
  const [openListServiceModal, setOpenListServiceModal] =
    useState<boolean>(false);
  const handleOpen = () => setOpenListServiceModal(true);
  const handleClose = () => setOpenListServiceModal(false);

  const appDispatch = useAppDispatch();
  const { isUserLoggedIn, userData } = useAppSelector(SelectAuth);
  // userlogin object
  const {
    data: userServicesListData,
    isSuccess: userServicesListISucess,
    isError: userServicesListIsError,
    error: userServicesListError,
    isLoading: userServicesListLoading,
  } = useListServicesQuery(
    { id: userData?._id != undefined ? userData._id.trim() : "" },
    { skip: !isUserLoggedIn }
  );
  const [tservices, setServices] = useState<Array<IProviderService>>([]);
  useEffect(() => {
    if (userServicesListISucess) services = userServicesListData;
  }, [userServicesListData]);

  /// comment list operation
  const {
    data: commentData,
    isSuccess: commentIsSuccess,
    isError: CommentIserror,
    error: commentError,
    isLoading: commentIsLoading,
  } = useListCommentsQuery(
    { id: userData?._id != undefined ? userData._id.trim() : "" },
    { skip: !isUserLoggedIn }
  );
  useEffect(() => {
    console.log("commentData  ", commentData);
  }, [commentIsSuccess]);

  // if there is comment error
  useEffect(() => {
    console.log("commentError  ", commentError);
  }, [CommentIserror]);

  // if there is comment loading
  useEffect(() => {
    console.log("commentIsLoading  ", commentIsLoading);
  }, [commentIsLoading]);

  const test = () => {
    services.forEach((e) => {
      return <ListCard Data={e} />;
    });
  };

  return (
    <body className="body">
      <Container>


        <Row style={{ display: "flex", flexWrap: "nowrap" }}>
          <div className="card-container">
            <Card className="card card1">
              <div className="circle circle1">
                <FaComment className="icon" />
              </div>
              <Card.Body>
                <Card.Title>1,234</Card.Title>
                <Card.Text>Total number of comments</Card.Text>
              </Card.Body>
            </Card>
          </div>

          <Col md={3}>
            <div className="card-container">
              <Card className="card card2">
                <div className="circle circle2">
                  <FaUsers className="icon" />
                </div>
                <Card.Body>
                  <Card.Title>5,678</Card.Title>
                  <Card.Text>Total number of customers</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={3}>
            <div className="card-container">
              <Card className="card card3">
                <div className="circle circle3">
                  <FaMoneyBillAlt className="icon" />
                </div>
                <Card.Body>
                  <Card.Title>$12,345</Card.Title>
                  <Card.Text>Total revenue</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={3}>
            <div className="card-container">
              <Card className="card card4">
                <div className="circle circle4">
                  <FaCalendarCheck className="icon" />
                </div>
                <Card.Body>
                  <Card.Title>30</Card.Title>
                  <Card.Text>Days since last incident</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="container2">
        <div className="div1">
          <div className={classes.root}>
            <Typography variant="h4">My Services</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              className={classes.addButton}
              onClick={() => {
                navigate("/addservice");
              }}
            >
              Add New Service
            </Button>
          {/*  <List className={classes.list}>
              {services.slice(0, 3).map((service, index) => (
                <ListItem key={index} className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar>
                      {service.serviceName != undefined
                        ? service.serviceName[0]
                        : ""}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={service.serviceName}
                    secondary={`${service.servicePrice} - ${service.serviceDescription}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit">

                    </IconButton>
                    <IconButton edge="end" aria-label="delete">

                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <Button onClick={handleOpen}>See all services</Button>
              </ListItem>
            </List>*/}
          </div>
        </div>
        <div className="div2">
          <>
            <List className={classes2.root}>
              {comments.map((comment) => (
                <ListItem key={comment.id} className={classes2.listItem}>
                  <ListItemAvatar>
                    <Avatar>{comment.author[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        {/* <Typography className={classes2.point}>{comment.point} point{comment.point !== 1 && 's'}</Typography>*/}
                        <Typography className={classes2.description}>
                          {comment.description}
                        </Typography>
                        <Typography className={classes2.author}>
                          {comment.author}
                        </Typography>
                        <div className={classes2.stars}>
                          {[...Array(comment.stars)].map((_, index) => (
                            <StarIcon
                              key={index}
                              className={classes2.starIcon}
                            />
                          ))}
                        </div>
                      </>
                    }
                    secondary={
                      <Typography className={classes2.date}>
                        {comment.date}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              className={classes2.button}
            >
              See all comments
            </Button>
          </>
        </div>
      </div>
    </body>
  );
};

export default Main;
function AppErrorMessage(message: any) {
  throw new Error("Function not implemented.");
}
