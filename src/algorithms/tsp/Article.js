import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import MoveToTop from "../../components/MoveToTop";
import TspSimulation from "./TspSimulation";

import pizzaImg from "./pizza-fig.svg";
import mstImg from "./mst-fig.svg";
import partialHamiltonianFig from "./partial-hamiltonian-fig.svg";
import hamiltonianFig from "./hamiltonian-fig.svg";

const useStyles = makeStyles((theme) => ({
  titleBlock: {
    height: "40vh",
    background: "linear-gradient(-45deg, #F095ff, #f64848)",
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
      color: "#f64848", // second color of gradient
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
    borderLeft: "5px solid #f64848", // second color of gradient
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
  syntaxBlock: {
    padding: "10px !important",
    borderLeft: "5px solid #20DED3", // second color of gradient
  },
}));

const CodeBlock = (props) => {
  const classes = useStyles();
  return (
    <SyntaxHighlighter
      language="javascript"
      style={docco}
      wrapLines={true}
      className={classes.syntaxBlock}
    >
      {props.children}
    </SyntaxHighlighter>
  );
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

        <h1 className={classes.title}>Travelling Salesman Problem</h1>
      </div>
      <div className={classes.body}>
        <div className={classes.section}>
          <h1 className={classes.heading}>Lets get your hands dirty</h1>
          <p className={classes.text}>
            This amazing tool can visualise the shortest path covering all the
            nodes, forming a cycle. To start, choose appropriate algorithm. Then
            select desired number of nodes from slider. And click on "Generate
            Random Nodes" to generate nodes. Then click on "Generate Path", to
            generate the shortest path.
          </p>
          <TspSimulation className={classes.simulator} />
        </div>
        <div className={classes.section}>
          <h1 className={classes.heading}>
            Curious case of pizza delivery boy
          </h1>
          <p className={classes.text}>
            In a café a group of people were having a chat, when suddenly a
            pizza delivery boy with a gloomy face enters.
          </p>
          <p className={classes.text}>
            He gets a drink for himself and starts crying out his woes.
          </p>
          <p className={classes.text}>
            He is supposed to perform deliveries to 10 houses, next day, but in
            order to cut down expenses and increase profit, his company has put
            up a condition that he must do this in the most efficient way
            possible. Moreover, he should not go by the same house twice. Hence
            he will travel the least and reduce fuel costs.
          </p>
          <p className={classes.text}>
            This sounded easy and he accepted it. But when he got back home and
            started thinking, he couldn’t find a way. Thus, he got stressed, and
            was thinking of quitting his job.
          </p>
          <p className={classes.text}>
            The group of people chanced to hear this and approached this pizza
            delivery boy. They promised to help him and sat down to look at this
            problem.
          </p>
          <p className={classes.text}>
            A person started with an example. He took a map having 4 buildings
            and distances between them. He said “let’s calculate all the
            possible paths, and then choose the smallest one”. It was a great
            idea. They sat down to make all paths and calculated.
          </p>
          {/* <img src="" className={classes.articleImage} /> */}
          <ImgDiv src={pizzaImg} caption={"Map of town having 4 buildings"} />
          <p className={classes.text}>
            It worked and was not that bad. He actually performed a{" "}
            <Mark>brute force</Mark> approach to calculate the shortest path.
            The person who suggested it was happy, and asked the pizza delivery
            boy to show his map. It was 11 buildings (including pizza shop), so
            all except one sat down searching across all paths.
          </p>
          <p className={classes.text}>Calculating.</p>
          <p className={classes.text}>Calculating.</p>
          <p className={classes.text}>
            <b>And still calculating...</b>
          </p>
          <p className={classes.text}>
            The one person who wasn’t calculating highlighted the issue with
            this approach. According to him, when it was just 4 buildings, a
            total of 6 paths were possible. Thus, for 11 buildings, there are 10
            possibilities from first building, for each 10 there are 9 and for
            each 9 there are 8.. that is 10*9*8*7*6.. paths and we have to
            choose the best of them. Hence, the worst possible number of paths
            for 11 buildings was (11-1)! = 10! i.e. 3628800.
          </p>
          <p className={classes.text}>
            The person said, “You start calculating, By the time you have all
            paths ready, I guess we’ll have our delivery boy's son doing the
            delivery. We’d not want that right..”
          </p>
          <p className={classes.text}>
            It was a valid point. That wasn’t a feasible solution. Everyone now
            turned to the person who showed this problem to help with a
            solution..
          </p>
          <p className={classes.text}>They started looking at the map…</p>
          <p className={classes.text}>
            And the person noticed. When you pick any three houses from the map,
            they form a triangle, and just like Archimedes, he started shouting
            eureka.
          </p>
          <p className={classes.text}>
            We know that in a triangle sum of two sides is always greater than
            the third side, This is what we call a{" "}
            <Mark>triangular inequality</Mark>.
          </p>
          <p className={classes.text}>
            The idea this young man came up with was quite amusing. He was a
            civil engineer and has recently been working on the shortest
            possible path to connect all buildings. This he liked to call
            Minimum Spanning Tree (MST) for which he did the following:
          </p>
          <MarkPara>
            Start from one home (let’s say H1). choose the home which is the
            nearest (let’s say H2). Now look from both H1 and H2 and see from
            which home any other unvisited home is nearest. That is, from H1 we
            have three houses at distance 2, 3, 5 km and from H2 we have 3
            houses at distance 1, 2, 3 km. We’ll now choose the shortest path
            i.e. the path with distance 1 km, and now repeat the same with
            second shortest, third shortest path and so on, such that all houses
            are chosen, and paths do not form any cycle. This method is also
            called the <Mark>Prim’s algorithm</Mark>, but this engineer was
            unaware of its existence and discovered it unknowingly. This helped
            him create the so-called MST. Now once he had the MST, he had to
            take care of back-tracking in order to preserve the path. Let’s look
            at the below MST of a graph.
          </MarkPara>
          <ImgDiv src={mstImg} caption={"A minimum spanning tree"} />
          <p className={classes.text}>
            Using this, he wanted to create a shortest path for the delivery
            boy. The problem now arises with House C.
          </p>
          <p className={classes.text}>
            He goes from A→B→C→D. Now what? Direct path to E isn’t there in MST.
          </p>
          <p className={classes.text}>
            In this case, we create a path from D→E and remove the one from C→E.
            This is where triangular inequality comes in.
          </p>
          <p className={classes.text}>
            Ideally he had to travel form D→C→E to reach E. But from the
            inequality it can be concluded, that the length of path from D→E
            will be lesser than or equal to length of path D→C and C→E combined.
            And hence,
          </p>
          <ImgDiv
            src={partialHamiltonianFig}
            caption={"Single path visiting each vertex only once"}
          />
          <p className={classes.text}>
            With this, we now have an approximately shortest path through all
            houses visiting each only once.
          </p>
          <p className={classes.text}>Everyone was amazed by this idea.</p>
          <p className={classes.text}>
            Someone raised a doubt: “What if we miss the best solution through
            this??”
          </p>
          <p className={classes.text}>
            The person replied: “MST is the shortest possible way of traversing
            each home and there is no way that the actual path we need would be
            any less than the MST. Hence It is quite reliable. And it might not
            be the best path but it really is an optimal path.”
          </p>
          <p className={classes.text}>
            Now what we are left with is to reach back, and to do this we just
            simply go back from the last building(house) to the first
            building(pizza shop).{" "}
            <Mark>
              The resulting path will not be more than twice the length of the
              actual path.
            </Mark>{" "}
            Hence this method is also called{" "}
            <Mark>2-approximation method.</Mark> The graph generated is also
            known as a <Mark>Hamiltonian tour</Mark>, as we are starting and
            finishing at the same vertex, and visiting each vertex exactly once.
          </p>
          <ImgDiv src={hamiltonianFig} caption={"Hamiltonian Tour"} />
          <CodeBlock>
            {`PROCEDURE ApproximationTSP():

  Vertex: v
  Distance: w
  Graph: G(v,w)

  k = MinimumSpanningTree(G)
  t = PreorderTravesal(k)
  u = RemoveDuplicateVertices(t)
  v = JoinAllAdjacentVertices(u)
  cycle = JoinLastVertexToFirst(v)
  return cycle

END PROCEDURE`}
          </CodeBlock>
          <p className={classes.text}>
            Everyone was really happy with this, the pizza delivery boy finally
            had a sigh of relief, and happily headed back. Delivery boy
            understood how the algorithm works, but being lazy, he did not
            calculate the actual path.
          </p>
          <p className={classes.text}>
            Could you help him to get the shortest path using the visualizer?
          </p>
        </div>
      </div>
      <MoveToTop />
    </div>
  );
};

export default ArticleComponent;
