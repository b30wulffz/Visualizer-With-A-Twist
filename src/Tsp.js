import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { ReactComponent as TspSvg } from "./tsp.svg";
import { Alert, AlertTitle } from "@material-ui/lab";

const algo = (setMinCost) => {
  const dist = [
    [0, 12, 7, 16],
    [8, 0, 20, 5],
    [21, 6, 0, 18],
    [7, 11, 6, 0],
  ];
  const srcId = 0;
  const nodes = [0, 1, 2, 3];

  const generateSubsets = (nodes) => {
    const n = nodes.length;
    const res = [];
    for (let i = 0; i < 1 << n; i++) {
      const temp = [];
      for (let j = 0; j < n; j++) {
        if ((i & (1 << j)) > 0) {
          temp.push(nodes[j]);
        }
      }
      res.push(temp);
    }
    return res;
  };

  const filteredNodes = nodes.filter((val) => val !== srcId);

  const routes = generateSubsets(filteredNodes);
  routes.sort((a, b) => a.length - b.length);
  console.log(routes);

  const cost = {};
  const possiblePath = {};

  for (let i = 0; i < routes.length - 1; i++) {
    const currentRoute = routes[i];
    for (let j = 0; j < filteredNodes.length; j++) {
      const homeNode = filteredNodes[j];
      if (routes[i].length > 0) {
        if (!currentRoute.includes(homeNode)) {
          console.log(currentRoute, homeNode);
          for (let k = 0; k < currentRoute.length; k++) {
            const prevNode = currentRoute[k];
            const prevRoute = currentRoute.filter((val) => val !== prevNode);
            if (typeof cost[[homeNode, currentRoute, srcId]] !== "undefined") {
              const newCost =
                dist[homeNode][prevNode] + cost[[prevNode, prevRoute, srcId]];
              const currentCost = cost[[homeNode, currentRoute, srcId]];
              if (newCost < currentCost) {
                cost[[homeNode, currentRoute, srcId]] = newCost;
                possiblePath[homeNode] = [];
                possiblePath[homeNode].push(prevNode);
              } else if (newCost === currentCost) {
                possiblePath[homeNode].push(prevNode);
              }
              //   cost[[homeNode, currentRoute, srcId]] = min(
              //     cost[[homeNode, currentRoute, srcId]],
              //     dist[homeNode][prevNode] + cost[[prevNode, prevRoute, srcId]]
              //   );
            } else {
              cost[[homeNode, currentRoute, srcId]] =
                dist[homeNode][prevNode] + cost[[prevNode, prevRoute, srcId]];
              possiblePath[homeNode] = [];
              possiblePath[homeNode].push(prevNode);
            }
            // console.log(homeNode, prevNode, currentRoute, prevRoute);
          }
          //   cost[[homeNode, currentRoute, srcId]] = min();
        }
        //   cost[[filteredNodes[j], routes[i], srcId]] = min(dist[]);
      } else {
        console.log(currentRoute, homeNode);
        cost[[homeNode, currentRoute, srcId]] = dist[homeNode][srcId];

        possiblePath[homeNode] = [];
        possiblePath[homeNode].push(srcId);
      }
    }
  }

  // for last route to go back to starting point
  let homeNode = srcId;
  let currentRoute = routes[routes.length - 1];
  for (let k = 0; k < currentRoute.length; k++) {
    const prevNode = currentRoute[k];
    const prevRoute = currentRoute.filter((val) => val !== prevNode);
    if (typeof cost[[homeNode, currentRoute, srcId]] !== "undefined") {
      const newCost =
        dist[homeNode][prevNode] + cost[[prevNode, prevRoute, srcId]];
      const currentCost = cost[[homeNode, currentRoute, srcId]];
      if (newCost < currentCost) {
        cost[[homeNode, currentRoute, srcId]] = newCost;
        possiblePath[homeNode] = [];
        possiblePath[homeNode].push(prevNode);
      } else if (newCost === currentCost) {
        possiblePath[homeNode].push(prevNode);
      }
      //   cost[[homeNode, currentRoute, srcId]] = min(
      //     cost[[homeNode, currentRoute, srcId]],
      //     dist[homeNode][prevNode] + cost[[prevNode, prevRoute, srcId]]
      //   );
    } else {
      cost[[homeNode, currentRoute, srcId]] =
        dist[homeNode][prevNode] + cost[[prevNode, prevRoute, srcId]];
      possiblePath[homeNode] = [];
      possiblePath[homeNode].push(prevNode);
    }
    // console.log(homeNode, prevNode, currentRoute, prevRoute);
  }
  console.log(cost[[homeNode, currentRoute, srcId]]);
  console.log(possiblePath);

  setMinCost(cost[[homeNode, currentRoute, srcId]]);
  //   const path = [];
  //   while (path.length < nodes.length) {
  //     path;
  //   }
};

const Tsp = (props) => {
  const [mincost, setMinCost] = useState(-1);
  return (
    <div style={{ textAlign: "center" }}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        // spacing={2}
      >
        <Grid item xs>
          <Typography variant="h4">Travelling Salesman Problem</Typography>
        </Grid>
        <Grid item xs>
          <TspSvg style={{ width: "400px" }} />
        </Grid>
        <Grid item xs>
          <Button
            onClick={() => algo(setMinCost)}
            variant="contained"
            color="secondary"
          >
            Execute
          </Button>
        </Grid>
        <Grid item>
          {mincost !== -1 ? (
            <Alert
              severity="success"
              style={{ width: "400px", margin: "20px 0px" }}
            >
              <AlertTitle>Successfully Calculated</AlertTitle>
              Minimum cost is: <strong>{mincost}</strong>
            </Alert>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default Tsp;
