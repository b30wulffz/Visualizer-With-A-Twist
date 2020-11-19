import React from "react";

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

const plotEdges = (setLinks, nodes, edgeArray) => {
  // const links = [
  //     { source: nodes[0], target: nodes[1] },
  //     { source: nodes[1], target: nodes[2] },
  //     { source: nodes[2], target: nodes[0] },
  //   ];

  const links = [];
  for (let i = 0; i < edgeArray.length - 1; i++) {
    const curNodeInd = edgeArray[i];
    const nextNodeInd = edgeArray[i + 1];
    links.push({ source: nodes[curNodeInd], target: nodes[nextNodeInd] });
  }
  // console.log(links);
  setLinks(links);
};

const DpTSPAlgo = (dist, srcId, nodes) => {
  const filteredNodes = nodes.filter((val) => val !== srcId);

  const routes = generateSubsets(filteredNodes);
  routes.sort((a, b) => a.length - b.length);
  // console.log(routes);

  const cost = {};
  const possiblePath = {};
  // console.log(filteredNodes);

  for (let i = 0; i < routes.length - 1; i++) {
    const currentRoute = routes[i];
    // console.log("-> Currentroute: " + currentRoute);
    for (let j = 0; j < filteredNodes.length; j++) {
      const homeNode = filteredNodes[j]; // vertex from where the path is being drawn (eg: 2 to src, 4 to src)
      // console.log("-> Homenode: " + homeNode);
      // when some vertices are present in between
      if (routes[i].length > 0) {
        // when homenode vertex is not present in between the route
        if (!currentRoute.includes(homeNode)) {
          // console.log(currentRoute, homeNode);
          for (let k = 0; k < currentRoute.length; k++) {
            const prevNode = currentRoute[k]; // next vertex to homenode(Homenode -> prevnode -> rest), this is used to connect homenode with this neighbouring vertex
            const prevRoute = currentRoute.filter((val) => val !== prevNode); // filtering route to remove this adjancent vertex
            if (typeof cost[[homeNode, currentRoute, srcId]] !== "undefined") {
              // if for the current route, when starting from homeNode has already been visited (cost has been calculated previously)
              const newCost =
                dist[homeNode][prevNode] + cost[[prevNode, prevRoute, srcId]];
              const currentCost = cost[[homeNode, currentRoute, srcId]];

              let paths = possiblePath[
                [prevNode, prevRoute, srcId]
              ].map((item) => [homeNode, ...item]);

              if (newCost < currentCost) {
                cost[[homeNode, currentRoute, srcId]] = newCost;
                // possiblePath[homeNode] = [];
                // possiblePath[homeNode].push(prevNode);
                possiblePath[[homeNode, currentRoute, srcId]] = paths;
                // console.log(possiblePath);
                // console.log(paths);
              } else if (newCost === currentCost) {
                // possiblePath[homeNode].push(prevNode);
                //  ----------------
                possiblePath[[homeNode, currentRoute, srcId]].push(...paths); // to append more than one path with same distance
                // console.log(possiblePath);
              }
            } else {
              // if for the current route, when starting from homeNode is visited for the first
              cost[[homeNode, currentRoute, srcId]] =
                dist[homeNode][prevNode] + cost[[prevNode, prevRoute, srcId]];
              // possiblePath[homeNode] = [];
              // possiblePath[homeNode].push(prevNode);
              let paths = possiblePath[
                [prevNode, prevRoute, srcId]
              ].map((item) => [homeNode, ...item]);

              possiblePath[[homeNode, currentRoute, srcId]] = paths;
              // console.log(paths);
              // console.log(possiblePath);
            }
            // console.log(homeNode, prevNode, currentRoute, prevRoute);
          }
          //   cost[[homeNode, currentRoute, srcId]] = min();
        }
        //   cost[[filteredNodes[j], routes[i], srcId]] = min(dist[]);
      } else {
        // for handling the case having no vertices in between
        // console.log(currentRoute, homeNode);
        cost[[homeNode, currentRoute, srcId]] = dist[homeNode][srcId];

        possiblePath[[homeNode, currentRoute, srcId]] = [];
        possiblePath[[homeNode, currentRoute, srcId]].push([homeNode, srcId]);
        // console.log(possiblePath[[homeNode, currentRoute, srcId]]);
        // possiblePath[homeNode].push(srcId);
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

      let paths = possiblePath[[prevNode, prevRoute, srcId]].map((item) => [
        homeNode,
        ...item,
      ]);

      if (newCost < currentCost) {
        cost[[homeNode, currentRoute, srcId]] = newCost;
        // possiblePath[homeNode] = [];
        // possiblePath[homeNode].push(prevNode);

        possiblePath[[homeNode, currentRoute, srcId]] = paths;
        // console.log(possiblePath);
      } else if (newCost === currentCost) {
        // possiblePath[homeNode].push(prevNode);
        // --------------------
        possiblePath[[homeNode, currentRoute, srcId]].push(...paths); // to append more than one path with same distance
        // console.log(possiblePath);
      }
    } else {
      cost[[homeNode, currentRoute, srcId]] =
        dist[homeNode][prevNode] + cost[[prevNode, prevRoute, srcId]];
      // possiblePath[homeNode] = [];
      // possiblePath[homeNode].push(prevNode);
      let paths = possiblePath[[prevNode, prevRoute, srcId]].map((item) => [
        homeNode,
        ...item,
      ]);
      possiblePath[[homeNode, currentRoute, srcId]] = paths;
      // console.log(possiblePath);
    }
    // console.log(homeNode, prevNode, currentRoute, prevRoute);
  }
  // console.log(cost[[homeNode, currentRoute, srcId]]);
  // console.log(possiblePath[[0, ...currentRoute, 0]]);
  // console.log(currentRoute);

  return possiblePath[[0, ...currentRoute, 0]];

  // setMinCost(cost[[homeNode, currentRoute, srcId]]);
  // //   const path = [];
  // //   while (path.length < nodes.length) {
  // //     path;
  // //   }
};

const DpTSP = (nodesList, setLinks) => {
  const nodeCount = nodesList.length;
  const srcId = 0;
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push(i);
  }

  // calculating distance for each
  const dist = [];
  for (let i = 0; i < nodeCount; i++) {
    const distFromSrc = [];
    const srcNode = nodesList[i];
    for (let j = 0; j < nodeCount; j++) {
      const destNode = nodesList[j];
      const distVal = Math.sqrt(
        Math.pow(destNode.x - srcNode.x, 2) +
          Math.pow(destNode.y - srcNode.y, 2)
      );
      distFromSrc.push(distVal);
    }
    dist.push(distFromSrc);
  }

  // generating hamiltonian tour

  const tours = DpTSPAlgo(dist, srcId, nodes);
  const tour = tours[0];
  // console.log(tours);
  // console.log(tour);
  plotEdges(setLinks, nodesList, tour);
};

export default DpTSP;
