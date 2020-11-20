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
  root: {
    height: "100vh",
  },
  algotile: {
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
      <Grid
        container
        className={classes.root}
        justify="space-around"
        alignItems="center"
      >
        <Grid item container xs={4} sp>
          <Grid item xs={12}>
            <Paper className={classes.algotile}>Algo 1</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.algotile}>Algo 1</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.algotile}>Algo 1</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.algotile}>Algo 1</Paper>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <img src={logoImage} className={classes.logoImage} />
        </Grid>
      </Grid>
      <ParticlesBg type={currentAnimation} bg={true} />
    </>
  );
};

export default HomeComponent;
