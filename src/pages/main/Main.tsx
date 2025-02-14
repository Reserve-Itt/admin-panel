import React, { Children, useEffect, useState } from "react";
import "./Main.css";
import Sidebar from "../Sidebar/Sidebar";
import { Container, Row, Col, Card } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import {
  FaComment,
  FaUsers,
  FaMoneyBillAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import { Typography, Button } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import {
  useGetMyAdvertisementsQuery,
  useGetStatisticsQuery,
  useListCommentsQuery,
  useListServicesQuery,
} from "../../services/ApiService/authApi";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { SelectAuth } from "../../features";
import {
  IAdvertisement,
  IProviderComments,
  IProviderService,
} from "../../types";

import { ProviderCommentsList, ServicesListCard } from "../../components";
import { useNavigate } from "react-router";
import AdvertisementCard from "../../components/advertisementCard/advertisementCard";

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
  stickyButton: {
    position: "sticky",
    top: theme.spacing(2),
    zIndex: 1,
    backgroundColor: "#e50505",
    width: 400,
  },
}));

const Main: React.FC = ({}) => {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [services, setServices] = useState<Array<IProviderService>>([]);
  const navigate = useNavigate();
  const [openListServiceModal, setOpenListServiceModal] =
    useState<boolean>(false);
  const handleOpen = () => setOpenListServiceModal(true);
  const handleClose = () => setOpenListServiceModal(false);

  const appDispatch = useAppDispatch();
  const { isUserLoggedIn, userData } = useAppSelector(SelectAuth);
  const [commentList, setCommentList] = useState<Array<IProviderComments>>([]);

  // userlogin object
  const {
    data: userServicesListData,
    isSuccess: userServicesListISucess,
    isError: userServicesListIsError,
    error: userServicesListError,
    isLoading: userServicesListLoading,
  } = useListServicesQuery(
    userData?._id != undefined ? userData._id.trim() : ""
  );

  // if there is userServicesListError
  useEffect(() => {
    console.log("userServicesListError  ", userServicesListError);
  }, [userServicesListIsError]);

  // if there is userServicesListLoading
  useEffect(() => {
    console.log("userServicesListLoading  ", userServicesListLoading);
  }, [userServicesListLoading]);

  // if there is userServicesListData
  useEffect(() => {
    console.log("userServicesListData  ", userServicesListData);
    if (userServicesListData && userServicesListData.result) {
      setServices(userServicesListData.result);
      console.log(userServicesListData);
    }
  }, [userServicesListISucess]);

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
    console.log("commentList  ", commentList);
  }, [commentList]);
  useEffect(() => {
    if (commentData && commentData.result) {
      setCommentList(commentData.result);
    }

    // console.log("commentData  ", commentData);
  }, [commentIsSuccess]);
  // if there is comment error
  useEffect(() => {
    console.log("commentError  ", commentError);
  }, [CommentIserror]);
  // if there is comment loading
  useEffect(() => {
    console.log("commentIsLoading  ", commentIsLoading);
  }, [commentIsLoading]);

  // statistics operation
  const {
    data: statisticsData,
    isSuccess: statisticsIsSuccess,
    isError: statisticsIsError,
    error: statisticsError,
    isLoading: statisticsIsLoading,
  } = useGetStatisticsQuery({});

  useEffect(() => {
    console.log("statisticsData  ", statisticsData);
  }, [statisticsIsSuccess]);
  // if there is statistics error
  useEffect(() => {
    console.log("statisticsError  ", statisticsError);
  }, [statisticsIsError]);
  // if there is statistics loading
  useEffect(() => {
    console.log("statisticsIsLoading  ", statisticsIsLoading);
  }, [statisticsIsLoading]);

  // get total number of customers of the provider
  const getTotalNumberOfCustomers = () => {
    let total = 0;
    if (statisticsData) {
      total = statisticsData.completedReservations;
      return total;
    }
  };
  // get total revenue of the provider
  const getTotalRevenue = () => {
    let total = 0;
    if (statisticsData) {
      total = statisticsData.totalEarnings;
      return total;
    }
  };

  const [advertisementData, setAdvertisementData] =
    useState<IAdvertisement[]>();
  const {
    data: myAdvertisementsData,
    isSuccess: myAdvertisementsIsSuccess,
    isError: myAdvertisementsIsError,
    error: myAdvertisementsError,
    isLoading: myAdvertisementsIsLoading,
  } = useGetMyAdvertisementsQuery({});

  // if there is myAdvertisements error
  useEffect(() => {
    console.log("myAdvertisementsError  ", myAdvertisementsError);
  }, [myAdvertisementsIsError]);
  // if there is myAdvertisements loading
  useEffect(() => {
    console.log("myAdvertisementsIsLoading  ", myAdvertisementsIsLoading);
  }, [myAdvertisementsIsLoading]);

  const [activeAdvertisement, setActiveAdvertisement] = useState<number>(0);
  // if there is myAdvertisements data
  useEffect(() => {
    console.log("myAdvertisementsData  ", myAdvertisementsData);
    if (
      myAdvertisementsData &&
      myAdvertisementsData?.result &&
      myAdvertisementsData?.result[0]?.advertisements
    ) {
      console.log("here");
      setActiveAdvertisement(
        myAdvertisementsData.result[0].advertisements.length
      );
      setAdvertisementData(myAdvertisementsData.result[0].advertisements);
    }
  }, [myAdvertisementsIsSuccess]);

  useEffect(() => {
    console.log("activeAdvertisement  ", activeAdvertisement);
  }, [activeAdvertisement]);
  useEffect(() => {
    console.log("advertisementData  ", advertisementData);
  }, [advertisementData]);

  const [open, setOpen] = React.useState(false);
  const handleBigModalOpen = () => setOpen(true);
  const handleBigModalClose = () => setOpen(false);

  const handleActiveAdvertisementButtonOnclik = () => {
    if (advertisementData != undefined && advertisementData.length > 0) {
      handleBigModalOpen();
    } else {
      alert("You don't have any active advertisements");
    }
  };

  return (
    <body className="body">
      <div>
        <Modal
          key={advertisementData?.length}
          open={open}
          onClose={handleBigModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modal-container">
            {advertisementData?.map((advertisement, index) => (
              <AdvertisementCard
                key={index}
                advertisementTitleText={advertisement.advertisementTitleText}
                advertisementDescriptionText={
                  advertisement.advertisementDescriptionText
                }
                advertisementStartDate={advertisement.advertisementStartDate}
                advertisementEndDate={advertisement.advertisementEndDate}
                advertisement_image_url={advertisement.advertisement_image_url}
              />
            ))}
          </div>
        </Modal>
      </div>
      <Container>
        <Row style={{ display: "flex", flexWrap: "nowrap" }}>
          <div className="card-container">
            <Card className="card card1">
              <div className="circle circle1">
                <FaComment className="icon" />
              </div>
              <Card.Body>
                <Card.Title>{commentList.length}</Card.Title>
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
                  <Card.Title>{getTotalNumberOfCustomers()}</Card.Title>
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
                  <Card.Title>{getTotalRevenue()}</Card.Title>
                  <Card.Text>Total revenue</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={3}>
            <div className="card-container">
              <Card
                onClick={handleActiveAdvertisementButtonOnclik}
                className="card card4"
              >
                <div className="circle circle4">
                  <FaCalendarCheck className="icon" />
                </div>
                <Card.Body>
                  <Card.Title>{activeAdvertisement}</Card.Title>
                  <Card.Text>Active advertisements</Card.Text>
                  {/* <button onClick={handleBigModalOpen} className="advertiesement-button">See Them</button>*/}
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="container2">
        <div className="div1">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={`${classes.addButton} ${classes.stickyButton}`}
            onClick={() => {
              navigate("/addservice");
            }}
          >
            Add New Service
          </Button>

          {services.length > 0 ? (
            services.map((service, index) => (
              <ServicesListCard
                key={index}
                serviceDescription={service.serviceDescription}
                serviceName={service.serviceName}
                servicePrice={service.servicePrice}
                serviceDuration={service.serviceDuration}
              />
            ))
          ) : (
            <Typography variant="h6">No Services Found</Typography>
          )}
        </div>

        <div className="div2">
          <>
            {Array.isArray(commentList) && (
              <ProviderCommentsList comments={commentList} />
            )}
          </>
        </div>
      </div>
    </body>
  );
};

export default Main;
