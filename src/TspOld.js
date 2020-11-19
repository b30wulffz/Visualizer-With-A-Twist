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
  console.log(filteredNodes);

  for (let i = 0; i < routes.length - 1; i++) {
    const currentRoute = routes[i];
    console.log("-> Currentroute: " + currentRoute);
    for (let j = 0; j < filteredNodes.length; j++) {
      const homeNode = filteredNodes[j]; // vertex from where the path is being drawn (eg: 2 to src, 4 to src)
      console.log("-> Homenode: " + homeNode);
      // when some vertices are present in between
      if (routes[i].length > 0) {
        // when homenode vertex is not present in between the route
        if (!currentRoute.includes(homeNode)) {
          console.log(currentRoute, homeNode);
          for (let k = 0; k < currentRoute.length; k++) {
            const prevNode = currentRoute[k]; // next vertex to homenode(Homenode -> prevnode -> rest), this is used to connect homenode with this neighbouring vertex
            const prevRoute = currentRoute.filter((val) => val !== prevNode); // filtering route to remove this adjancent vertex
            if (typeof cost[[homeNode, currentRoute, srcId]] !== "undefined") {
              // if for the current route, when starting from homeNode has already been visited (cost has been calculated previously)
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
              // if for the current route, when starting from homeNode is visited for the first
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
        // for handling the case having no vertices in between
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
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  enqueue(element, priority) {
    var qElement = new QElement(element, priority);
    var contain = false;

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(qElement);
    }
  }
  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  isEmpty() {
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

  tree[srcId] = [];
  visited.push(srcId);
  unvisited = unvisited.filter((item) => item != srcId);
  for (let i = 0; i < dist[srcId].length; i++) {
    if (nodes[i] != srcId) {
      // (Parent, Yet to be visited)
      allDist.enqueue([srcId, nodes[i]], dist[srcId][i]); // storing edge weights between the src vertex and its neighbours
    }
  }

  // let parent = srcId;

  while (unvisited.length > 0) {
    let smallestEdge = allDist.dequeue().element;
    let parentVertex = smallestEdge[0];
    let nearestVertex = smallestEdge[1];
    unvisited = unvisited.filter((item) => item != nearestVertex);
    visited.push(nearestVertex);

    console.log(smallestEdge);

    // appending to tree
    if (typeof tree[parentVertex] === "undefined") {
      tree[parentVertex] = [];
    }
    tree[parentVertex].push(nearestVertex);

    // inserting neighbouring edges
    let childVertexId = nearestVertex;
    console.log(childVertexId);
    console.log(dist[childVertexId]);
    for (let i = 0; i < dist[childVertexId].length; i++) {
      if (!visited.includes(nodes[i])) {
        allDist.enqueue([childVertexId, nodes[i]], dist[childVertexId][i]); // storing edge weights between the src vertex and its neighbours
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
  }

  console.log(unvisited);
  console.log(visited);
  console.log(tree);
  return tree;
};

const preorder = (tree, parent, visited) => {
  if (!visited.includes(parent)) {
    visited.push(parent);
  }
  if (typeof tree[parent] !== "undefined") {
    for (let i = 0; i < tree[parent].length; i++) {
      preorder(tree, tree[parent][i], visited);
    }
  }
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
  let tree = getMST(nodes, dist, srcId);

  // generating hamiltonian tour
  //get preorder traversal for unique nodes
  console.log(tree);
  let tour = [];
  preorder(tree, srcId, tour);
  tour.push(srcId);
  console.log(tour);
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
