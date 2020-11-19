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
} from "@material-ui/core";

import DpTSP from "./DpTSP";
import ApproxTSP from "./ApproxTSP";

const useStyles = makeStyles({});

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

const generateNodes = (count, setNodes, setLinks) => {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    let x_val = 25 + (parseInt(Math.random() * 1000) % 450);
    let y_val = 25 + (parseInt(Math.random() * 1000) % 450);
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
  const [nodeCount, setNodeCount] = useState(4);
  const [nodes, setNodes] = useState([]);
  const [linksMethod1, setLinksMethod1] = useState([]);
  const [linksMethod2, setLinksMethod2] = useState([]);
  const [costMethod1, setCostMethod1] = useState(-1);
  const [costMethod2, setCostMethod2] = useState(-1);
  const [timeMethod1, setTimeMethod1] = useState(-1);
  const [timeMethod2, setTimeMethod2] = useState(-1);

  useEffect(() => {
    generateNodes(nodeCount, setNodes, setLinksMethod1);
  }, []);

  const [curTabInd, setCurTabInd] = React.useState(0);

  const changeTab = (event, newValue) => {
    setCurTabInd(newValue);
  };

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
          <Tab label="Active" />]
          <Tab label="Active" />
        </Tabs>
      </Paper>
      <TabPanel value={curTabInd} index={0}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={8}>
            <TspGraph
              height={500}
              width={500}
              nodes={nodes}
              links={linksMethod1}
            />
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
                  generateNodes(nodeCount, setNodes, setLinksMethod1);
                }}
              >
                Generate
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  //   dpBasedTsp(nodeCount, setNodes);
                  DpTSP(nodes, setLinksMethod1);
                }}
              >
                DP Approach
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={curTabInd} index={1}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={8}>
            <TspGraph
              height={500}
              width={500}
              nodes={nodes}
              links={linksMethod2}
            />
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
                  generateNodes(nodeCount, setNodes, setLinksMethod2);
                }}
              >
                Generate
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  //   dpBasedTsp(nodeCount, setNodes);
                  ApproxTSP(nodes, setLinksMethod2);
                }}
              >
                Approx TSP
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
    </div>
  );
};

export default TspSimulation;
