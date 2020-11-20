import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Graph } from "@visx/network";
import { GradientPinkRed } from "@visx/gradient";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Typography,
  Slider,
  Box,
  AppBar,
  Tabs,
  Tab,
  Paper,
  Backdrop,
  CircularProgress,
  Card,
} from "@material-ui/core";
import { useSpring, animated } from "react-spring";

import DpTSP from "./DpTSP";
import ApproxTSP from "./ApproxTSP";

const useStyles = makeStyles((theme) => ({
  graphContainer: {
    display: "flex",
    justifyContent: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  button: {
    width: "250px",
    padding: "10px",
  },
  resultBlock: {
    // background: "#B5EF8A",
    // background: "#1FDCDB",#F95D92
    background: "#F95D92",
    padding: "20px",
    textAlign: "center",
    fontSize: "25px",
    color: "#ffffff",
    // justifyContent: "center",
  },
}));

const TspGraph = (props) => {
  //   const nodes = [
  //     { x: 50, y: 20, color: "#000" },
  //     { x: 200, y: 300 },
  //     { x: 300, y: 40 },
  //   ];
  const nodes = props.nodes;

  //   const links = [
  //     { source: nodes[0], target: nodes[1] },
  //     { source: nodes[1], target: nodes[2] },
  //     { source: nodes[2], target: nodes[0] },
  //   ];

  const links = props.links;

  const graph = {
    nodes,
    links,
  };

  return (
    <svg width={props.width} height={props.height} className="tsp-graph">
      <GradientPinkRed id="dots-pink" />
      <rect
        width={props.width}
        height={props.height}
        rx={14}
        fill="url(#dots-pink)"
      />

      {/* <rect width={props.width} height={props.height} rx={14} fill={} /> */}
      <GradientPinkRed id="dots-pink" />
      <Graph graph={graph} fill="rgba(255,255,255,0.2)" />
    </svg>
  );
};

const generateNodes = (count, setNodes, setLinks, height, width) => {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    let x_val = 25 + (parseInt(Math.random() * 1000) % (width - 50));
    let y_val = 25 + (parseInt(Math.random() * 1000) % (height - 50));
    nodes.push({
      x: x_val,
      y: y_val,
    });
  }
  setNodes(nodes);
  setLinks([]);
};

const TspSimulation22 = () => {
  const [nodeCount, setNodeCount] = useState(4);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  useEffect(() => {
    generateNodes(nodeCount, setNodes, setLinks);
  }, []);
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={8}>
        <TspGraph height={500} width={500} nodes={nodes} links={links} />
      </Grid>
      <Grid item xs={8}>
        <Slider
          defaultValue={4}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={3}
          max={16}
          value={nodeCount}
          onChange={(event, val) => setNodeCount(val)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            generateNodes(nodeCount, setNodes, setLinks);
          }}
        >
          Generate
        </Button>
      </Grid>
      <Grid item container xs={12}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              //   dpBasedTsp(nodeCount, setNodes);
              DpTSP(nodes, setLinks);
            }}
          >
            DP Approach
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              //   dpBasedTsp(nodeCount, setNodes);
              ApproxTSP(nodes, setLinks);
            }}
          >
            Approximation Approach
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TspSimulation = () => {
  const classes = useStyles();

  const [nodeCount, setNodeCount] = useState(6);
  const [nodes, setNodes] = useState([]);
  const [linksMethod1, setLinksMethod1] = useState([]);
  const [linksMethod2, setLinksMethod2] = useState([]);
  const [costMethod1, setCostMethod1] = useState(-1);
  const [costMethod2, setCostMethod2] = useState(-1);
  const [timeMethod1, setTimeMethod1] = useState(-1);
  const [timeMethod2, setTimeMethod2] = useState(-1);

  const [loader, setLoader] = useState(false);

  const height = 400;
  const width = 400;

  useEffect(() => {
    generateNodes(nodeCount, setNodes, setLinksMethod1, height, width);
    generateNodes(nodeCount, setNodes, setLinksMethod2, height, width);
  }, []);

  const [curTabInd, setCurTabInd] = React.useState(0);

  const changeTab = (event, newValue) => {
    setCurTabInd(newValue);
  };

  // for animated time and cost
  const propsCostM1 = useSpring({
    number: costMethod1,
    from: { number: 0 },
  });

  const propsCostM2 = useSpring({
    number: costMethod2,
    from: { number: 0 },
  });

  const propsTimeM1 = useSpring({
    number: timeMethod1,
    from: { number: 0 },
  });

  const propsTimeM2 = useSpring({
    number: timeMethod2,
    from: { number: 0 },
  });

  // useEffect(() => {
  //   if (loaderM1 === true) {
  //     setTimeout(() => {
  //       DpTSP(nodes, setLinksMethod1);
  //       setLoaderM1(false);
  //     }, 0);
  //     // var promise = new Promise((resolve, reject) => {
  //     //   DpTSP(nodes, setLinksMethod1);
  //     //   resolve("Promise resolved successfully");
  //     // });

  //     // promise.then((result) => {
  //     //   setLoaderM1(false);
  //     // });
  //   }
  // }, [loaderM1]);

  return (
    <div>
      <Paper square>
        <Tabs
          value={curTabInd}
          indicatorColor="primary"
          textColor="primary"
          onChange={changeTab}
          aria-label="disabled tabs example"
          variant="fullWidth"
        >
          <Tab label="Bruteforce TSP" />]
          <Tab label="Approximation TSP" />
        </Tabs>
      </Paper>
      <TabPanel value={curTabInd} index={0}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={12} md={8} className={classes.graphContainer}>
            <TspGraph
              height={height}
              width={width}
              nodes={nodes}
              links={linksMethod1}
            />
          </Grid>
          <Grid item xs={8}>
            <Slider
              defaultValue={6}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={3}
              max={16}
              value={nodeCount}
              onChange={(event, val) => setNodeCount(val)}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            justify="space-around"
            alignItems="center"
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setLinksMethod2([]);
                  generateNodes(
                    nodeCount,
                    setNodes,
                    setLinksMethod1,
                    height,
                    width
                  );
                }}
                className={classes.button}
              >
                Generate Random Nodes
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setLoader(true);
                  setTimeout(() => {
                    DpTSP(
                      nodes,
                      setLinksMethod1,
                      setCostMethod1,
                      setTimeMethod1
                    );
                    setLoader(false);
                  }, 500);
                }}
                className={classes.button}
              >
                Generate Path
              </Button>
            </Grid>
          </Grid>
          <Grid container item spacing={4}>
            <Grid item xs>
              <Paper className={classes.resultBlock} elevation={0}>
                Cost:{" "}
                {costMethod1 != -1 ? (
                  <>
                    <animated.span>
                      {propsCostM1.number.interpolate((val) => Math.floor(val))}
                    </animated.span>{" "}
                    Units
                  </>
                ) : (
                  "N/A"
                )}
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.resultBlock} elevation={0}>
                Time Taken:{" "}
                {timeMethod1 != -1 ? (
                  <>
                    <animated.span>
                      {propsTimeM1.number.interpolate((val) => Math.floor(val))}
                    </animated.span>{" "}
                    ms
                  </>
                ) : (
                  "N/A"
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={curTabInd} index={1}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={12} md={8} className={classes.graphContainer}>
            <TspGraph
              height={height}
              width={width}
              nodes={nodes}
              links={linksMethod2}
            />
          </Grid>
          <Grid item xs={8}>
            <Slider
              defaultValue={6}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={3}
              max={16}
              value={nodeCount}
              onChange={(event, val) => setNodeCount(val)}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            justify="space-around"
            alignItems="center"
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setLinksMethod1([]);
                  generateNodes(
                    nodeCount,
                    setNodes,
                    setLinksMethod2,
                    height,
                    width
                  );
                }}
                className={classes.button}
              >
                Generate Random Nodes
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setLoader(true);
                  setTimeout(() => {
                    ApproxTSP(
                      nodes,
                      setLinksMethod2,
                      setCostMethod2,
                      setTimeMethod2
                    );
                    setLoader(false);
                  }, 500);
                }}
                className={classes.button}
              >
                Generate Path
              </Button>
            </Grid>
          </Grid>
          <Grid container item spacing={4}>
            <Grid item xs>
              <Paper className={classes.resultBlock} elevation={0}>
                Cost:{" "}
                {costMethod2 != -1 ? (
                  <>
                    <animated.span>
                      {propsCostM2.number.interpolate((val) => Math.floor(val))}
                    </animated.span>{" "}
                    Units
                  </>
                ) : (
                  "N/A"
                )}
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.resultBlock} elevation={0}>
                Time Taken:{" "}
                {timeMethod2 != -1 ? (
                  <>
                    <animated.span>
                      {propsTimeM2.number.interpolate((val) => Math.floor(val))}
                    </animated.span>{" "}
                    ms
                  </>
                ) : (
                  "N/A"
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default TspSimulation;
