import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

import MoveToTop from "../../components/MoveToTop";
import LGSimulation from "./LGSimulation";

// import pizzaImg from "./pizza-fig.svg";
// import mstImg from "./mst-fig.svg";
// import partialHamiltonianFig from "./partial-hamiltonian-fig.svg";
// import hamiltonianFig from "./hamiltonian-fig.svg";

const useStyles = makeStyles((theme) => ({
  titleBlock: {
    height: "40vh",
    background: "linear-gradient(-45deg, #4facfe, #00f2fe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: "60px",
    textAlign: "center",
    color: "#fff",
  },
  backButton: {
    position: "absolute",
    left: "40px",
    top: "40px",
    color: "#fff",
    border: "thin solid #fff",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
    textAlign: "center",
    transition: "0.3s ease",

    "&:hover": {
      background: "#fff",
      color: "#00f2fe", // second color of gradient
    },
  },
  body: {
    margin: "30px 10vw",
  },
  section: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  simulator: {
    // width: "80%",
    alignSelf: "center",
    background: "#F2F3F4",
    margin: "20px 0",
  },
  text: {
    margin: "10px 0",
  },
  importantText: {
    color: "red",
    fontWeight: "500",
  },
  importantParagraph: {
    padding: "10px",
    borderLeft: "5px solid #00f2fe", // second color of gradient
    background: "#F2F3F4",
  },
  articleImageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  articleImage: {
    maxHeight: "400px",
  },
  articleImageCaption: {
    fontSize: "13px",
    background: "#F2F3F4",
    padding: "2px",
  },
}));

const H1 = (props) => {
  const classes = useStyles();
  return <h1 className={classes.heading}>{props.children}</h1>;
};

const H2 = (props) => {
  const classes = useStyles();
  return <h2 className={classes.heading}>{props.children}</h2>;
};

const H3 = (props) => {
  const classes = useStyles();
  return <h3 className={classes.heading}>{props.children}</h3>;
};

const Text = (props) => {
  const classes = useStyles();
  return <p className={classes.text}>{props.children}</p>;
};

const Mark = (props) => {
  const classes = useStyles();
  return <span className={classes.importantText}>{props.children}</span>;
};

const MarkPara = (props) => {
  const classes = useStyles();
  return (
    <div className={`${classes.importantParagraph} ${classes.text}`}>
      {props.children}
    </div>
  );
};

const ImgDiv = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.articleImageContainer}>
      <img src={props.src} className={classes.articleImage} />
      {props.caption ? (
        <p className={classes.articleImageCaption}>{props.caption}</p>
      ) : null}
    </div>
  );
};

const ArticleComponent = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <div className={classes.titleBlock} id="top-anchor">
        {/* <div className={classes.backButton}></div> */}
        <IconButton
          className={classes.backButton}
          onClick={() => history.push("/")}
        >
          <HomeIcon />
        </IconButton>

        <h1 className={classes.title}>Lerchs Grossman Algorithm</h1>
      </div>
      <div className={classes.body}>
        <div className={classes.section}>
          <H1>Lets get your hands dirty</H1>
          <Text>
            {/* To be Modified */}
            This is a Visualiser set up in Minecraft world. This finds how much
            deeper you should dig.
          </Text>
          <LGSimulation className={classes.simulator} />
        </div>
        <div className={classes.section}></div>
      </div>
      <MoveToTop />
    </div>
  );
};

export default ArticleComponent;
