import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { Grid, TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "800px",
    background: "red",
  },
  title: {
    background: "#ffa45b",
    color: "#fff",
    fontSize: "30px",
    padding: "10px",
    textAlign: "center",
  },
  block: {
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "25px",
    wordBreak: "break-word",
  },
  block1: {
    background: "#fbf6f0",
  },
  block2: {
    background: "#aee6e6",
    color: "#fff",
  },
  inputBox: {
    width: "100%",
  },
  inputBoxFont: {
    fontSize: "25px",
  },
  inputBoxUnderline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },

  //   ioBlock: {
  //     border: "none",
  //     // background: "yellow",
  //     width: "100%",
  //     boxSizing: "border-box",
  //   },
  //   block1: {
  //     background: "#fbf6f0",
  //   },
  //   block2: {
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     textAlign: "center",
  //     background: "#aee6e6",
  //     color: "#fff",
  //     wordBreak: "break-word",
  //   },
  //   resize: {
  //     fontSize: "30px",
  //   },
}));

const Md5Simulation = (props) => {
  const classes = useStyles();
  const [inputVal, setInputVal] = useState("");
  const [md5Val, setMd5Val] = useState("");

  const handleChange = (value) => {
    setInputVal(value);
    if (value === "") {
      setMd5Val("");
    } else {
      setMd5Val(CryptoJS.MD5(value).toString());
    }
  };

  return (
    <Grid
      container
      className={`${props.className ? props.className : ""} ${classes.root}`}
    >
      <Grid item xs={12} className={classes.title}>
        Live Text to MD5 Encryptor
      </Grid>
      <Grid item container xs={12}>
        <Grid xs={6} className={`${classes.block} ${classes.block1}`}>
          <TextField
            // label="Multiline"
            multiline
            rows={10}
            // variant="outlined"
            placeholder="Enter text here"
            value={inputVal}
            onChange={(event) => handleChange(event.target.value)}
            className={`${classes.inputBox}`}
            InputProps={{
              classes: {
                input: classes.inputBoxFont,
                underline: classes.inputBoxUnderline,
              },
            }}
          />
        </Grid>
        <Grid xs={6} className={`${classes.block} ${classes.block2}`}>
          <div className={"s"}>
            {md5Val != "" ? (
              md5Val
            ) : (
              <div className={classes.md5Txt}>MD5 Hash</div>
            )}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Md5Simulation;
