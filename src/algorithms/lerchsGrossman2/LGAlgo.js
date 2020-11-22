import blockDig from "./blockDig.jpg";
import blockStop from "./blockStop.png";
import blockWaste from "./blockWaste.png";
import blockSearch from "./blockSearch.png";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Graph {
  constructor() {
    this.AdjList = new Map();
  }

  addVertex(vertex, weight) {
    if (!this.AdjList.has(vertex)) {
      this.AdjList.set(vertex, [weight]);
    } else {
      throw "Already Exist!!!";
    }
  }

  addEdge(vertex, node) {
    if (this.AdjList.has(vertex)) {
      if (this.AdjList.has(node)) {
        let arr = this.AdjList.get(vertex);
        if (!arr.includes(node)) {
          arr.push(node);
        }
      } else {
        throw `Can't add non-existing vertex ->'${node}'`;
      }
    } else {
      throw `You should add '${vertex}' first`;
    }
  }

  childrenVertex(
    vertex //gives only immediate Children
  ) {
    if (this.AdjList.has(vertex)) {
      let i;
      let ans = this.AdjList.get(vertex);
      let children = [];
      for (i = 1; i < ans.length; i++) {
        children.push(ans[i]);
      }
      return children;
    } else {
      throw "Vertex doesnt Exist!!!";
    }
  }

  Cone(vertex) {
    if (this.AdjList.has(vertex)) {
      let ans = this.AdjList.get(vertex);
      let total;
      if (ans.length == 4)
        total =
          ans[0] + this.LCone(ans[1]) + this.UCone(ans[2]) + this.RCone(ans[3]);
      else if (ans.length == 1) total = ans[0];

      return total;
    } else {
      throw "Vertex doesnt Exist!!!";
    }
  }

  LCone(vertex) {
    if (this.AdjList.has(vertex)) {
      let ans = this.AdjList.get(vertex);
      let total;
      if (ans.length == 4)
        total = ans[0] + this.LCone(ans[1]) + this.UCone(ans[2]);
      else if (ans.length == 1) total = ans[0];

      return total;
    } else {
      throw "Vertex doesnt Exist!!!";
    }
  }

  RCone(vertex) {
    if (this.AdjList.has(vertex)) {
      let ans = this.AdjList.get(vertex);
      let total;
      if (ans.length == 4)
        total = ans[0] + this.UCone(ans[2]) + this.RCone(ans[3]);
      else if (ans.length == 1) total = ans[0];

      return total;
    } else {
      throw "Vertex doesnt Exist!!!";
    }
  }

  UCone(vertex) {
    if (this.AdjList.has(vertex)) {
      let ans = this.AdjList.get(vertex);
      let total;
      if (ans.length == 4) total = ans[0] + this.UCone(ans[2]);
      else if (ans.length == 1) total = ans[0];

      return total;
    } else {
      throw "Vertex doesnt Exist!!!";
    }
  }

  DigCone(vertex) {
    if (this.AdjList.has(vertex)) {
      let ans = this.AdjList.get(vertex);
      ans[0] = 0;
      if (ans.length == 4) {
        this.DigCone(ans[1]);
        this.DigCone(ans[2]);
        this.DigCone(ans[3]);
      }
      console.log("Digged !");
    } else {
      throw "Vertex doesnt Exist!!!";
    }
  }
  //Ye change kiya hai ......
  Dig() {
    var max_profit = 0;
    var cone_block;
    let all_prof_blocks = [];
    do {
      max_profit = 0;
      for (let [key, value] of this.AdjList) {
        let b = value[0];
        if (b >= 0) {
          let a = this.Cone(key);

          if (a > max_profit) {
            cone_block = key;
            max_profit = a;
          }
        }
      }
      if (max_profit > 0) {
        console.log("We will be digging : ", cone_block);
        console.log("Profit was : ", max_profit);
        this.DigCone(cone_block);
        all_prof_blocks.push(cone_block);
      }
    } while (max_profit > 0);
    return all_prof_blocks;
  }
  //Yaha tkk change kiy hai

  MovingCone() {
    var total_prof = 0;
    var allb = [
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "C",
      "D",
      "E",
      "F",
      "A",
      "B",
    ];
    let iter;
    var all_prof_blocks = [];
    for (iter = 0; iter < allb.length; iter++) {
      let a = this.Cone(allb[iter]);

      if (a > 0) {
        total_prof += a;
        this.DigCone(allb[iter]);
        all_prof_blocks.push(allb[iter]);
      }
    }
    console.log(total_prof, all_prof_blocks);

    return all_prof_blocks;
  }

  print() {
    for (let [key, value] of this.AdjList) {
      console.log(key, "Cost =>", value[0]);
      let i;
      let neighbours = [];
      for (i = 1; i < value.length; i++) {
        neighbours.push(value[i]);
      }
      console.log(neighbours);
      console.log(key, "Total Cost of mining  =>> ", this.Cone(key));
      console.log("");
    }
  }

  startviz() {
    for (let [key, value] of this.AdjList) {
      document.getElementById(key).innerHTML = value[0];
      //   document.getElementById(key).style.backgroundColor = "white";
      document.getElementById(key).style.backgroundImage = `url(${blockWaste})`;
    }
  }

  async coneviz(vertex) {
    if (this.AdjList.has(vertex)) {
      //   document.getElementById(vertex).style.backgroundColor = "red";
      document.getElementById(
        vertex
      ).style.backgroundImage = `url(${blockStop})`;
      let ans = this.AdjList.get(vertex);
      if (ans.length == 4) {
        this.coneviz(ans[1]);
        // document.getElementById(ans[1]).style.backgroundColor = "yellow";
        document.getElementById(
          ans[1]
        ).style.backgroundImage = `url(${blockDig})`;
        await sleep(500);
        this.coneviz(ans[2]);
        // document.getElementById(ans[2]).style.backgroundColor = "yellow";
        document.getElementById(
          ans[2]
        ).style.backgroundImage = `url(${blockDig})`;
        await sleep(500);
        this.coneviz(ans[3]);
        // document.getElementById(ans[3]).style.backgroundColor = "yellow";
        document.getElementById(
          ans[3]
        ).style.backgroundImage = `url(${blockDig})`;
        await sleep(500);
      }
    } else {
      throw "Vertex doesnt Exist!!!";
    }
  }
}

var g;
var cpy;

async function rnd() {
  g = new Graph();
  cpy = new Graph();

  let arr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
  ];
  for (let i = 0; i < arr.length; i++) {
    let rnd = Math.floor(Math.random() * 100 - 35);
    g.addVertex(arr[i], rnd);
    cpy.addVertex(arr[i], rnd);
  }

  //Adding All the edges

  g.addEdge("A", "C");
  g.addEdge("A", "D");
  g.addEdge("A", "E");
  g.addEdge("B", "D");
  g.addEdge("B", "E");
  g.addEdge("B", "F");
  g.addEdge("C", "G");
  g.addEdge("C", "H");
  g.addEdge("C", "I");
  g.addEdge("D", "H");
  g.addEdge("D", "I");
  g.addEdge("D", "J");
  g.addEdge("E", "I");
  g.addEdge("E", "J");
  g.addEdge("E", "K");
  g.addEdge("F", "J");
  g.addEdge("F", "K");
  g.addEdge("F", "L");
  g.addEdge("G", "M");
  g.addEdge("G", "N");
  g.addEdge("G", "O");
  g.addEdge("H", "N");
  g.addEdge("H", "O");
  g.addEdge("H", "P");
  g.addEdge("I", "O");
  g.addEdge("I", "P");
  g.addEdge("I", "Q");
  g.addEdge("J", "P");
  g.addEdge("J", "Q");
  g.addEdge("J", "R");
  g.addEdge("K", "Q");
  g.addEdge("K", "R");
  g.addEdge("K", "S");
  g.addEdge("L", "R");
  g.addEdge("L", "S");
  g.addEdge("L", "T");
  g.addEdge("M", "U");
  g.addEdge("M", "V");
  g.addEdge("M", "W");
  g.addEdge("N", "V");
  g.addEdge("N", "W");
  g.addEdge("N", "X");
  g.addEdge("O", "W");
  g.addEdge("O", "X");
  g.addEdge("O", "Y");
  g.addEdge("P", "X");
  g.addEdge("P", "Y");
  g.addEdge("P", "Z");
  g.addEdge("Q", "Y");
  g.addEdge("Q", "Z");
  g.addEdge("Q", "a");
  g.addEdge("R", "Z");
  g.addEdge("R", "a");
  g.addEdge("R", "b");
  g.addEdge("S", "a");
  g.addEdge("S", "b");
  g.addEdge("S", "c");
  g.addEdge("T", "b");
  g.addEdge("T", "c");
  g.addEdge("T", "d");

  //Making a Copy of the Pit

  cpy.addEdge("A", "C");
  cpy.addEdge("A", "D");
  cpy.addEdge("A", "E");
  cpy.addEdge("B", "D");
  cpy.addEdge("B", "E");
  cpy.addEdge("B", "F");
  cpy.addEdge("C", "G");
  cpy.addEdge("C", "H");
  cpy.addEdge("C", "I");
  cpy.addEdge("D", "H");
  cpy.addEdge("D", "I");
  cpy.addEdge("D", "J");
  cpy.addEdge("E", "I");
  cpy.addEdge("E", "J");
  cpy.addEdge("E", "K");
  cpy.addEdge("F", "J");
  cpy.addEdge("F", "K");
  cpy.addEdge("F", "L");
  cpy.addEdge("G", "M");
  cpy.addEdge("G", "N");
  cpy.addEdge("G", "O");
  cpy.addEdge("H", "N");
  cpy.addEdge("H", "O");
  cpy.addEdge("H", "P");
  cpy.addEdge("I", "O");
  cpy.addEdge("I", "P");
  cpy.addEdge("I", "Q");
  cpy.addEdge("J", "P");
  cpy.addEdge("J", "Q");
  cpy.addEdge("J", "R");
  cpy.addEdge("K", "Q");
  cpy.addEdge("K", "R");
  cpy.addEdge("K", "S");
  cpy.addEdge("L", "R");
  cpy.addEdge("L", "S");
  cpy.addEdge("L", "T");
  cpy.addEdge("M", "U");
  cpy.addEdge("M", "V");
  cpy.addEdge("M", "W");
  cpy.addEdge("N", "V");
  cpy.addEdge("N", "W");
  cpy.addEdge("N", "X");
  cpy.addEdge("O", "W");
  cpy.addEdge("O", "X");
  cpy.addEdge("O", "Y");
  cpy.addEdge("P", "X");
  cpy.addEdge("P", "Y");
  cpy.addEdge("P", "Z");
  cpy.addEdge("Q", "Y");
  cpy.addEdge("Q", "Z");
  cpy.addEdge("Q", "a");
  cpy.addEdge("R", "Z");
  cpy.addEdge("R", "a");
  cpy.addEdge("R", "b");
  cpy.addEdge("S", "a");
  cpy.addEdge("S", "b");
  cpy.addEdge("S", "c");
  cpy.addEdge("T", "b");
  cpy.addEdge("T", "c");
  cpy.addEdge("T", "d");

  console.log("StartViz");

  cpy.startviz();

  console.log("EndViz");
}

async function bf() {
  var pb = g.Dig(); //The whole digging process happens here

  let arr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
  ];

  for (let i = 0; i < pb.length; i++) {
    let trial = 0;
    for (let j = 0; j < arr.length; j++) {
      if (pb.includes(arr[j]) && trial <= i) {
        document.getElementById(
          arr[j]
        ).style.backgroundImage = `url(${blockStop})`;
        trial++;
      } else {
        document.getElementById(
          arr[j]
        ).style.backgroundImage = `url(${blockSearch})`;
        await sleep(200);
        document.getElementById(
          arr[j]
        ).style.backgroundImage = `url(${blockWaste})`;
      }
    }
    console.log("Trying to add block Search");
  }

  console.log("Times will happen = ", pb.length);
  for (let i = 0; i < pb.length; i++) {
    cpy.coneviz(pb[i]);
    await sleep(2000);
    console.log(i);
  }

  console.log("Over");
}

async function mc() {
  var sup = cpy.MovingCone();

  console.log("hello?", sup);

  for (let i = 0; i < sup.length; i++) {
    cpy.coneviz(sup[i]);
    await sleep(1000);
    console.log(i);
  }

  console.log(" exec3 Over");
}

async function preset1() {
  g = new Graph();
  cpy = new Graph();

  let arr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
  ];

  var rnd3 = [
    8,
    10,
    45,
    -9,
    -12,
    20,
    -18,
    22,
    14,
    33,
    4,
    10,
    41,
    -1,
    -41,
    -3,
    35,
    4,
    30,
    -20,
    36,
    45,
    22,
    -16,
    -16,
    -22,
    -10,
    20,
    47,
    -2,
  ];
  for (let i = 0; i < arr.length; i++) {
    let rnd = rnd3[i];
    g.addVertex(arr[i], rnd);
    cpy.addVertex(arr[i], rnd);
  }

  //Adding All the edges

  g.addEdge("A", "C");
  g.addEdge("A", "D");
  g.addEdge("A", "E");
  g.addEdge("B", "D");
  g.addEdge("B", "E");
  g.addEdge("B", "F");
  g.addEdge("C", "G");
  g.addEdge("C", "H");
  g.addEdge("C", "I");
  g.addEdge("D", "H");
  g.addEdge("D", "I");
  g.addEdge("D", "J");
  g.addEdge("E", "I");
  g.addEdge("E", "J");
  g.addEdge("E", "K");
  g.addEdge("F", "J");
  g.addEdge("F", "K");
  g.addEdge("F", "L");
  g.addEdge("G", "M");
  g.addEdge("G", "N");
  g.addEdge("G", "O");
  g.addEdge("H", "N");
  g.addEdge("H", "O");
  g.addEdge("H", "P");
  g.addEdge("I", "O");
  g.addEdge("I", "P");
  g.addEdge("I", "Q");
  g.addEdge("J", "P");
  g.addEdge("J", "Q");
  g.addEdge("J", "R");
  g.addEdge("K", "Q");
  g.addEdge("K", "R");
  g.addEdge("K", "S");
  g.addEdge("L", "R");
  g.addEdge("L", "S");
  g.addEdge("L", "T");
  g.addEdge("M", "U");
  g.addEdge("M", "V");
  g.addEdge("M", "W");
  g.addEdge("N", "V");
  g.addEdge("N", "W");
  g.addEdge("N", "X");
  g.addEdge("O", "W");
  g.addEdge("O", "X");
  g.addEdge("O", "Y");
  g.addEdge("P", "X");
  g.addEdge("P", "Y");
  g.addEdge("P", "Z");
  g.addEdge("Q", "Y");
  g.addEdge("Q", "Z");
  g.addEdge("Q", "a");
  g.addEdge("R", "Z");
  g.addEdge("R", "a");
  g.addEdge("R", "b");
  g.addEdge("S", "a");
  g.addEdge("S", "b");
  g.addEdge("S", "c");
  g.addEdge("T", "b");
  g.addEdge("T", "c");
  g.addEdge("T", "d");

  //Making a Copy of the Pit

  cpy.addEdge("A", "C");
  cpy.addEdge("A", "D");
  cpy.addEdge("A", "E");
  cpy.addEdge("B", "D");
  cpy.addEdge("B", "E");
  cpy.addEdge("B", "F");
  cpy.addEdge("C", "G");
  cpy.addEdge("C", "H");
  cpy.addEdge("C", "I");
  cpy.addEdge("D", "H");
  cpy.addEdge("D", "I");
  cpy.addEdge("D", "J");
  cpy.addEdge("E", "I");
  cpy.addEdge("E", "J");
  cpy.addEdge("E", "K");
  cpy.addEdge("F", "J");
  cpy.addEdge("F", "K");
  cpy.addEdge("F", "L");
  cpy.addEdge("G", "M");
  cpy.addEdge("G", "N");
  cpy.addEdge("G", "O");
  cpy.addEdge("H", "N");
  cpy.addEdge("H", "O");
  cpy.addEdge("H", "P");
  cpy.addEdge("I", "O");
  cpy.addEdge("I", "P");
  cpy.addEdge("I", "Q");
  cpy.addEdge("J", "P");
  cpy.addEdge("J", "Q");
  cpy.addEdge("J", "R");
  cpy.addEdge("K", "Q");
  cpy.addEdge("K", "R");
  cpy.addEdge("K", "S");
  cpy.addEdge("L", "R");
  cpy.addEdge("L", "S");
  cpy.addEdge("L", "T");
  cpy.addEdge("M", "U");
  cpy.addEdge("M", "V");
  cpy.addEdge("M", "W");
  cpy.addEdge("N", "V");
  cpy.addEdge("N", "W");
  cpy.addEdge("N", "X");
  cpy.addEdge("O", "W");
  cpy.addEdge("O", "X");
  cpy.addEdge("O", "Y");
  cpy.addEdge("P", "X");
  cpy.addEdge("P", "Y");
  cpy.addEdge("P", "Z");
  cpy.addEdge("Q", "Y");
  cpy.addEdge("Q", "Z");
  cpy.addEdge("Q", "a");
  cpy.addEdge("R", "Z");
  cpy.addEdge("R", "a");
  cpy.addEdge("R", "b");
  cpy.addEdge("S", "a");
  cpy.addEdge("S", "b");
  cpy.addEdge("S", "c");
  cpy.addEdge("T", "b");
  cpy.addEdge("T", "c");
  cpy.addEdge("T", "d");

  console.log("StartViz");

  cpy.startviz();

  console.log("EndViz");
}

async function preset2() {
  g = new Graph();
  cpy = new Graph();

  let arr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
  ];

  var rnd4 = [
    36,
    21,
    -300,
    -50,
    -75,
    -27,
    5,
    15,
    8,
    -28,
    44,
    -8,
    30,
    17,
    44,
    -15,
    32,
    43,
    13,
    39,
    -15,
    12,
    -8,
    13,
    27,
    -13,
    15,
    11,
    43,
    16,
  ];
  for (let i = 0; i < arr.length; i++) {
    let rnd = rnd4[i];
    g.addVertex(arr[i], rnd);
    cpy.addVertex(arr[i], rnd);
  }

  //Adding All the edges

  g.addEdge("A", "C");
  g.addEdge("A", "D");
  g.addEdge("A", "E");
  g.addEdge("B", "D");
  g.addEdge("B", "E");
  g.addEdge("B", "F");
  g.addEdge("C", "G");
  g.addEdge("C", "H");
  g.addEdge("C", "I");
  g.addEdge("D", "H");
  g.addEdge("D", "I");
  g.addEdge("D", "J");
  g.addEdge("E", "I");
  g.addEdge("E", "J");
  g.addEdge("E", "K");
  g.addEdge("F", "J");
  g.addEdge("F", "K");
  g.addEdge("F", "L");
  g.addEdge("G", "M");
  g.addEdge("G", "N");
  g.addEdge("G", "O");
  g.addEdge("H", "N");
  g.addEdge("H", "O");
  g.addEdge("H", "P");
  g.addEdge("I", "O");
  g.addEdge("I", "P");
  g.addEdge("I", "Q");
  g.addEdge("J", "P");
  g.addEdge("J", "Q");
  g.addEdge("J", "R");
  g.addEdge("K", "Q");
  g.addEdge("K", "R");
  g.addEdge("K", "S");
  g.addEdge("L", "R");
  g.addEdge("L", "S");
  g.addEdge("L", "T");
  g.addEdge("M", "U");
  g.addEdge("M", "V");
  g.addEdge("M", "W");
  g.addEdge("N", "V");
  g.addEdge("N", "W");
  g.addEdge("N", "X");
  g.addEdge("O", "W");
  g.addEdge("O", "X");
  g.addEdge("O", "Y");
  g.addEdge("P", "X");
  g.addEdge("P", "Y");
  g.addEdge("P", "Z");
  g.addEdge("Q", "Y");
  g.addEdge("Q", "Z");
  g.addEdge("Q", "a");
  g.addEdge("R", "Z");
  g.addEdge("R", "a");
  g.addEdge("R", "b");
  g.addEdge("S", "a");
  g.addEdge("S", "b");
  g.addEdge("S", "c");
  g.addEdge("T", "b");
  g.addEdge("T", "c");
  g.addEdge("T", "d");

  //Making a Copy of the Pit

  cpy.addEdge("A", "C");
  cpy.addEdge("A", "D");
  cpy.addEdge("A", "E");
  cpy.addEdge("B", "D");
  cpy.addEdge("B", "E");
  cpy.addEdge("B", "F");
  cpy.addEdge("C", "G");
  cpy.addEdge("C", "H");
  cpy.addEdge("C", "I");
  cpy.addEdge("D", "H");
  cpy.addEdge("D", "I");
  cpy.addEdge("D", "J");
  cpy.addEdge("E", "I");
  cpy.addEdge("E", "J");
  cpy.addEdge("E", "K");
  cpy.addEdge("F", "J");
  cpy.addEdge("F", "K");
  cpy.addEdge("F", "L");
  cpy.addEdge("G", "M");
  cpy.addEdge("G", "N");
  cpy.addEdge("G", "O");
  cpy.addEdge("H", "N");
  cpy.addEdge("H", "O");
  cpy.addEdge("H", "P");
  cpy.addEdge("I", "O");
  cpy.addEdge("I", "P");
  cpy.addEdge("I", "Q");
  cpy.addEdge("J", "P");
  cpy.addEdge("J", "Q");
  cpy.addEdge("J", "R");
  cpy.addEdge("K", "Q");
  cpy.addEdge("K", "R");
  cpy.addEdge("K", "S");
  cpy.addEdge("L", "R");
  cpy.addEdge("L", "S");
  cpy.addEdge("L", "T");
  cpy.addEdge("M", "U");
  cpy.addEdge("M", "V");
  cpy.addEdge("M", "W");
  cpy.addEdge("N", "V");
  cpy.addEdge("N", "W");
  cpy.addEdge("N", "X");
  cpy.addEdge("O", "W");
  cpy.addEdge("O", "X");
  cpy.addEdge("O", "Y");
  cpy.addEdge("P", "X");
  cpy.addEdge("P", "Y");
  cpy.addEdge("P", "Z");
  cpy.addEdge("Q", "Y");
  cpy.addEdge("Q", "Z");
  cpy.addEdge("Q", "a");
  cpy.addEdge("R", "Z");
  cpy.addEdge("R", "a");
  cpy.addEdge("R", "b");
  cpy.addEdge("S", "a");
  cpy.addEdge("S", "b");
  cpy.addEdge("S", "c");
  cpy.addEdge("T", "b");
  cpy.addEdge("T", "c");
  cpy.addEdge("T", "d");

  console.log("StartViz");

  cpy.startviz();

  console.log("EndViz");
}

const bf_p1 = () => {
  preset1();
  bf();
};

const bf_p2 = () => {
  preset2();
  bf();
};

const bf_rnd = () => {
  rnd();
  bf();
};

const mc_p1 = () => {
  preset1();
  mc();
};

const mc_p2 = () => {
  preset2();
  mc();
};

const mc_rnd = () => {
  rnd();
  mc();
};

export { bf_p1, bf_p2, bf_rnd, mc_p1, mc_p2, mc_rnd };
