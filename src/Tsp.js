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

class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// PriorityQueue class
class PriorityQueue {
  // An array is used to implement priority
  constructor() {
    this.items = [];
  }
  enqueue(element, priority) {
    // creating object from queue element
    var qElement = new QElement(element, priority);
    var contain = false;

    // iterating through the entire
    // item array to add element at the
    // correct location of the Queue
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    // if the element have the highest priority
    // it is added at the end of the queue
    if (!contain) {
      this.items.push(qElement);
    }
  }
  dequeue() {
    // return the dequeued element
    // and remove it.
    // if the queue is empty
    // returns Underflow
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
}

const getMST = (nodes, dist, srcId) => {
  let tree = {};
  let allDist = new PriorityQueue();
  let visited = [],
    unvisited = [];

  for (let i = 0; i < nodes.length; i++) {
    unvisited.push(nodes[i]);
  }

  tree[srcId] = -1;
  visited.push(srcId);
  unvisited = unvisited.filter((item) => item != srcId);
  for (let i = 0; i < dist[srcId].length; i++) {
    if (nodes[i] != srcId) {
      allDist.enqueue(nodes[i], dist[srcId][i]); // storing edge weights between the src vertex and its neighbours
    }
  }

  while (unvisited.length > 0) {
    let nearestVertex = allDist.dequeue().element;
    unvisited = unvisited.filter((item) => item != nearestVertex);
    visited.push(nearestVertex);

    // inserting neighbouring edges
    for (let i = 0; i < dist[srcId].length; i++) {
      if (!visited.includes(nodes[i])) {
        allDist.enqueue(nodes[i], dist[srcId][i]); // storing edge weights between the src vertex and its neighbours
      }
    }

    // removing cycle edges
    for (let i = allDist.items.length - 1; i >= 0; i--) {
      if (visited.includes(allDist.items[i].element)) {
        // extracting value of neighbouring node
        allDist.items.splice(i, 1);
        console.log(i);
      }
    }
    console.log(unvisited);
    console.log(visited);
    if (visited.length > 1000) {
      break;
    }
  }

  console.log(unvisited);
  console.log(visited);
  console.log(tree);
  console.log(allDist.dequeue());
  console.log(allDist.dequeue());
  console.log(allDist.dequeue());
};

const approxTSP = (setMinCost) => {
  const dist = [
    [0, 12, 7, 16],
    [8, 0, 20, 5],
    [21, 6, 0, 18],
    [7, 11, 6, 0],
  ];
  const srcId = 0;
  const nodes = [0, 1, 2, 3];
  getMST(nodes, dist, srcId);
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
        <Grid container item xs>
          <Grid item>
            <Button
              onClick={() => algo(setMinCost)}
              variant="contained"
              color="secondary"
            >
              Execute DP Approach
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => approxTSP(setMinCost)}
              variant="contained"
              color="secondary"
            >
              Execute Approximation Approach
            </Button>
          </Grid>
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
