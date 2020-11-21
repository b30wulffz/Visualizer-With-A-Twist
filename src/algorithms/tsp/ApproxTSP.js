import React from "react";

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

const plotEdges = (setLinks, nodes, edgeArray) => {
  const links = [];
  for (let i = 0; i < edgeArray.length - 1; i++) {
    const curNodeInd = edgeArray[i];
    const nextNodeInd = edgeArray[i + 1];
    links.push({ source: nodes[curNodeInd], target: nodes[nextNodeInd] });
  }
  // console.log(links);
  setLinks(links);
};

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

    // console.log(smallestEdge);

    // appending to tree
    if (typeof tree[parentVertex] === "undefined") {
      tree[parentVertex] = [];
    }
    tree[parentVertex].push(nearestVertex);

    // inserting neighbouring edges
    let childVertexId = nearestVertex;
    // console.log(childVertexId);
    // console.log(dist[childVertexId]);
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
        // console.log(i);
      }
    }
    // console.log(unvisited);
    // console.log(visited);
  }

  // console.log(unvisited);
  // console.log(visited);
  // console.log(tree);
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

const ApproxTSP = (nodesList, setLinks, setCost, setTime) => {
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

  const start = window.performance.now();
  let tree = getMST(nodes, dist, srcId);

  // generating hamiltonian tour
  //get preorder traversal for unique nodes
  // console.log(tree);
  let tour = [];
  preorder(tree, srcId, tour);
  tour.push(srcId);
  // console.log(tour);
  // calculating cost
  let cost = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    const currentNode = tour[i];
    const nextNode = tour[i + 1];
    cost += dist[currentNode][nextNode];
  }

  const end = window.performance.now();

  plotEdges(setLinks, nodesList, tour);
  setCost(Math.ceil(cost));
  setTime(Math.ceil(end - start));

  return 1;
};

export default ApproxTSP;
