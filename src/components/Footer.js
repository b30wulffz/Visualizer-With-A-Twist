import React from "react";
import { makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  footer: {
    height: "70px",
    background: "#34495E",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  quote: {
    display: "flex",
    alignItems: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.quote}>
        Made with&nbsp;
        <FavoriteIcon />
      </div>
    </div>
  );
};

export default Footer;
