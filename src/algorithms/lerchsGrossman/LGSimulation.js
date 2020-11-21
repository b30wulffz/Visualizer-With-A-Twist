import "./LGSimulation.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, ButtonBase } from "@material-ui/core";
import exec from "./LGAlgo";
import skyImage from "./sky2.jpg";
import groundImage from "./ground7.png";
import playButton from "./playButton2.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "700px",
  },
  sky: {
    background: `url(${skyImage})`,
    height: "400px",
    // backgroundSize: "600px 300px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ground: {
    background: `url(${groundImage})`,
    padding: "0 10px 10px 10px",
    display: "flex",
    justifyContent: "center",
    borderRadius: "0",
  },
  playButton: {
    height: "100px",
  },
  playButtonImg: {
    height: "100px",
    width: "100px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}));

const LGSimulation = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.sky}>
          <ButtonBase onClick={() => exec()} className={classes.playButton}>
            <span
              className={classes.playButtonImg}
              style={{
                backgroundImage: `url(${playButton})`,
              }}
            />
          </ButtonBase>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.ground}>
          <table className="grid-mines" cellspacing="0">
            <tr className="row-1">
              <td id="U" className="grid-cell"></td>
              <td id="V" className="grid-cell"></td>
              <td id="W" className="grid-cell"></td>
              <td id="X" className="grid-cell"></td>
              <td id="Y" className="grid-cell"></td>
              <td id="Z" className="grid-cell"></td>
              <td id="a" className="grid-cell"></td>
              <td id="b" className="grid-cell"></td>
              <td id="c" className="grid-cell"></td>
              <td id="d" className="grid-cell"></td>
            </tr>
            <tr className="row-2">
              <td id="40" className="none"></td>
              <td id="M" className="grid-cell"></td>
              <td id="N" className="grid-cell"></td>
              <td id="O" className="grid-cell"></td>
              <td id="P" className="grid-cell"></td>
              <td id="Q" className="grid-cell"></td>
              <td id="R" className="grid-cell"></td>
              <td id="S" className="grid-cell"></td>
              <td id="T" className="grid-cell"></td>
            </tr>
            <tr className="row-3">
              <td id="40" className="none"></td>
              <td id="40" className="none"></td>
              <td id="G" className="grid-cell"></td>
              <td id="H" className="grid-cell"></td>
              <td id="I" className="grid-cell"></td>
              <td id="J" className="grid-cell"></td>
              <td id="K" className="grid-cell"></td>
              <td id="L" className="grid-cell"></td>
            </tr>
            <tr className="row-4">
              <td id="40" className="none"></td>
              <td id="40" className="none"></td>
              <td id="40" className="none"></td>
              <td id="C" className="grid-cell"></td>
              <td id="D" className="grid-cell"></td>
              <td id="E" className="grid-cell"></td>
              <td id="F" className="grid-cell"></td>
            </tr>
            <tr className="row-5">
              <td id="40" className="none"></td>
              <td id="40" className="none"></td>
              <td id="40" className="none"></td>
              <td id="40" className="none"></td>
              <td id="A" className="grid-cell"></td>
              <td id="B" className="grid-cell"></td>
            </tr>
          </table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LGSimulation;
