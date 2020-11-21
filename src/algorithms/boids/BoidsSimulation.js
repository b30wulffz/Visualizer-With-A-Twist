import React from "react";
import { Grid, TextField, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // background: "red",
    // backgroundColor: "#32e0c4",
    backgroundColor: "#78EABE",
    color: "#fff",
    // backgroundImage: "linear-gradient(315deg, #08C8F6 0%, #4D5DFB 74%)",
    padding: "30px",
    textAlign: "center",
    fontSize: "25px",
    cursor: "pointer",
    borderRadius: "20px",
    transition: "0.3s ease",
    display: "block",
    boxSizing: "border-box",

    "&:hover": {
      boxShadow: "inset 0 0 0 2000px rgba(36, 36, 36, 0.3)",
      opacity: "0.9",
    },
  },
}));

const BoidsSimulation = (props) => {
  const classes = useStyles();
  return (
    <a
      className={`${props.className ? props.className : ""} ${classes.root}`}
      href="https://andr0id100.github.io/boids-final/"
      target="_blank"
    >
      Click here to teleport to the Visualiser
    </a>
  );
};

export default BoidsSimulation;
