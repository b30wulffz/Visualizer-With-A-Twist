import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ParticlesBg from "particles-bg";
import logoImage from "./logo.svg";

const useStyles = makeStyles((theme) => ({
  logoImage: {},
  lowerHalf: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: "50px",
    boxSizing: "border-box",
  },
  lowerHalfHeadingSection: {
    flex: "1",
  },
  lowerHalfHeading: {
    textAlign: "center",
  },
  tilesSection: {
    flex: "6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    // background: "red",
  },
  tilesPart: {
    flex: "1",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    // background: "yellow",
  },
  tile: {
    flex: 1,
    background: "blue",
    margin: "30px",
    height: "200px",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "#fff",
    transition: "0.3s ease",
    fontSize: "30px",
    opacity: "0.8",
    textAlign: "center",
    "&:hover": {
      boxShadow: "inset 0 0 0 2000px rgba(36, 36, 36, 0.3)",
      opacity: "0.9",
    },
  },
  tile1: {
    background: "linear-gradient(-45deg, #F095ff, #f64848)",
  },
  tile2: {
    background: "linear-gradient(-45deg, #F6FBA2, #20DED3)",
    // background: "linear-gradient(-45deg, #20E2D7, #F9FEA5)",
    // background-image: linear-gradient(-225deg, #20E2D7 0%, #F9FEA5 100%);
  },
  tile3: {
    background: "linear-gradient(-45deg, #4facfe, #00f2fe)",
    // background-image: linear-gradient(-225deg, #20E2D7 0%, #F9FEA5 100%);
  },
  tile4: {
    background: "linear-gradient(-45deg, #FB7BA2, #FCE043)",
    // background: "linear-gradient(-45deg, #ff5f6d, #ffc371)",
    // background: "linear-gradient(-45deg, #f6d365, #fda085)",
    // background: "linear-gradient(-45deg, #e0c3fc, #8ec5fc)",
  },
  algoInfoBody: {
    width: "80vw",
  },
  algotile: {
    width: "100px",
    padding: "20px",
    background: "red",
  },
}));

const HomeComponent = () => {
  const classes = useStyles();

  const animations = ["ball", "square", "polygon"];
  const [currentAnimation, setCurrentAnimation] = useState(
    animations[Math.floor(Math.random() * animations.length)]
  );

  //   useEffect(() => {
  //     setCurrentAnimation(
  //       animations[Math.floor(Math.random() * animations.length)]
  //     );
  //   }, []);

  return (
    <>
      <div className={classes.lowerHalf}>
        <div className={classes.lowerHalfHeadingSection}>
          <h1 className={classes.lowerHalfHeading}>Learn something new!</h1>
        </div>
        <div className={classes.tilesSection}>
          <div className={classes.tilesPart}>
            <div className={`${classes.tile} ${classes.tile1}`}>
              Travelling Salesman Problem
            </div>
            <div className={`${classes.tile} ${classes.tile2}`}>
              Boid's Algorithm
            </div>
          </div>
          <div className={classes.tilesPart}>
            <div className={`${classes.tile} ${classes.tile3}`}>
              Lerchs Grossman Algorithm
            </div>
            <div className={`${classes.tile} ${classes.tile4}`}>
              Cryptography
            </div>
          </div>
        </div>
      </div>
      <ParticlesBg type={"polygon"} bg={true} />
    </>
  );
};

export default HomeComponent;
