import "./LGSimulation.css";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, ButtonBase } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import { bf_p1, bf_p2, bf_rnd, mc_p1, mc_p2, mc_rnd } from "./LGAlgo";
import skyImage from "./sky2.jpg";
import groundImage from "./ground7.png";
import playButton from "./playButton2.png";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: "linear-gradient(315deg, #48A9FE 0%, #0BEEF9 74%)",
    // backgroundImage: "linear-gradient(315deg, #0BEEF9 0%, #98FCBD 74%)",
    // backgroundImage: "linear-gradient(315deg, #62AC43 0%, #0083ED 74%)",
    // background: "linear-gradient(-45deg, #4facfe, #00f2fe)",
    // backgroundImage: "linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%)",
    margin: "20px 0",
    background: "#F2F3F4",
    padding: "30px",
  },
  controlContainer: {
    // background: "#20D5FE",
    // background-color: #045de9;
    // backgroundImage: "linear-gradient(315deg, #045de9 0%, #04F0FF 74%)",
    // backgroundImage: "linear-gradient(315deg, #48A9FE 0%, #0BEEF9 74%)",
    // backgroundImage: "linear-gradient(315deg, #48A9FE 0%, #0BEEF9 74%)",background-color: #9cdaf8;
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  controlTitle: {
    // color: "#fff",
    color: "#808080",
    fontSize: "50px",
    fontWeight: "500",
  },
  // controlButtonGroupBlock: {},
  controlButtonGroup: {
    boxSizing: "border-box",
    margin: "10px 0",
    width: "100%",
  },
  controlButton: {
    width: "100%",
  },
  resultBlock: {
    width: "100%",
    textAlign: "center",
    background: "#BEBEBE",
    boxSizing: "border-box",
    padding: "10px",
    fontSize: "25px",
    color: "#fff",
    fontWeight: "500",
  },
  gameContainer: {
    width: "700px",
    // transform: "scale(0.8)",
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
  const [buttonAlgo, setButtonAlgo] = useState("algo1");
  const [buttonPreset, setButtonPreset] = useState("random");
  const [algo, setAlgo] = useState(null); //------------

  const handleButtonAlgo = (event, value) => {
    if (value != null) {
      setButtonAlgo(value);
    }
  };

  const handleButtonPreset = (event, value) => {
    if (value != null) {
      setButtonPreset(value);
    }
  };

  useEffect(() => {
    setAlgo(() => bf_rnd);
  }, []);

  const handleSubmit = () => {
    if (buttonAlgo === "algo1") {
      if (buttonPreset === "preset1") {
        setAlgo(() => bf_p1);
      } else if (buttonPreset === "preset2") {
        setAlgo(() => bf_p2);
      } else {
        setAlgo(() => bf_rnd);
      }
    } else {
      if (buttonPreset === "preset1") {
        setAlgo(() => mc_p1);
      } else if (buttonPreset === "preset2") {
        setAlgo(() => mc_p2);
      } else {
        setAlgo(() => mc_rnd);
      }
    }
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={4} className={classes.controlContainer}>
        <div className={classes.controlTitle}>Visualiser</div>
        <div className={classes.controlButtonGroupBlock}>
          <ToggleButtonGroup
            value={buttonAlgo}
            exclusive
            onChange={handleButtonAlgo}
            aria-label="text alignment"
            className={classes.controlButtonGroup}
          >
            <ToggleButton value="algo1" className={classes.controlButton}>
              Brute Force
            </ToggleButton>
            <ToggleButton value="algo2" className={classes.controlButton}>
              Moving Cone
            </ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup
            value={buttonPreset}
            exclusive
            onChange={handleButtonPreset}
            aria-label="text alignment"
            className={classes.controlButtonGroup}
          >
            <ToggleButton value="preset1" className={classes.controlButton}>
              Preset 1
            </ToggleButton>
            <ToggleButton value="preset2" className={classes.controlButton}>
              Preset 2
            </ToggleButton>
            <ToggleButton value="random" className={classes.controlButton}>
              Random
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className={classes.controlButtonBlock} style={{ width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", padding: "10px" }}
            onClick={() => handleSubmit()}
          >
            Set
          </Button>
        </div>
        {/* <div className={classes.resultBlock}>Score: N/A</div> */}
      </Grid>
      <Grid item xs={8} container className={classes.gameContainer}>
        <Grid item xs={12}>
          <Paper className={classes.sky}>
            <ButtonBase onClick={() => algo()} className={classes.playButton}>
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
    </Grid>
  );
};

export default LGSimulation;
