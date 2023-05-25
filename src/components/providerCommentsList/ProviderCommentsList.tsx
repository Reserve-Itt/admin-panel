import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { makeStyles } from "@material-ui/core/styles";
import { IProviderComments } from "../../types";

interface IProps {
  comments: IProviderComments[];
}

const useStyles = makeStyles({
  listContainer: {
    maxHeight: "400px",
    overflow: "auto",
  },
  listItem: {
    alignItems: "flex-start",
    marginBottom: "1rem",
    padding: "1rem",
    backgroundColor: "#f5f5f5",
    borderRadius: "0.5rem",
    borderBottom: "2px solid #ddd",
  },
  description: {
    fontSize: "1.25rem",
    marginBottom: "0.5rem",
  },
  stars: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  starIcon: {
    color: "#FFC107",
    marginRight: "0.25rem",
  },
  date: {
    fontSize: "0.75rem",
    color: "#666",
  },
});

const ProviderCommentsList: React.FC<IProps> = ({ comments }) => {
  const classes = useStyles();

  return (
    <>
      {comments.length === 0 && (
        <Typography variant="h6" align="center">
          No comments yet.
        </Typography>
      )}

      {comments.length > 0 && (
        <div className={classes.listContainer}>
          <List>
            {Array.isArray(comments) &&
              comments.map((comment, index) => (
                <ListItem key={index} className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar>
                      {comment.userId != undefined
                        ? comment.userId[Math.floor(Math.random() * 26)]
                        : ""}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        <Typography className={classes.description}>
                          {comment.comment}
                        </Typography>
                        <div className={classes.stars}>
                          {typeof comment.commentRate === "number" &&
                            comment.commentRate <= 5 &&
                            (() => {
                              const stars = [];
                              for (let i = 0; i < comment.commentRate; i++) {
                                stars.push(
                                  <StarIcon
                                    key={i}
                                    className={classes.starIcon}
                                  />
                                );
                              }
                              return stars;
                            })()}
                        </div>
                      </>
                    }
                    secondary={
                      <Typography className={classes.date}>
                        {comment.commentedAt != undefined
                          ? comment.commentedAt.substring(0, 10)
                          : ""}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </div>
      )}
    </>
  );
};

export default ProviderCommentsList;
