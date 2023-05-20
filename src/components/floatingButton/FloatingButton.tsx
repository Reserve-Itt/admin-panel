import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  onClick: () => void;
}

const useStyles = makeStyles({
  floatingButton: {
    position: "fixed",
    bottom: "0",
    right: "0",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    backgroundColor: "red",
    color: "white",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.2s ease-in-out",
  },
});

const width = window.innerWidth;
const height = window.innerHeight;
console.log(width, height);
const FloatingButton: React.FC<IProps> = ({ onClick }) => {
  const classes = useStyles();
  const [position, setPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        const newX = prevPosition.x + Math.floor(Math.random() * 1000) - 400;
        const newY = prevPosition.y + Math.floor(Math.random() * 1000) - 400;
        const limitedX = Math.min(Math.max(newX, 400), 1500);
        const limitedY = Math.max(Math.min(newY, 700), 50);
        return { x: limitedX, y: limitedY };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.floatingButton}
      style={{ bottom: `${position.y}px`, right: `${position.x}px` }}
      onClick={onClick}
    >
      Add New Service
    </Button>
  );
};
export default FloatingButton;
