import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import MoveToTop from "../../components/MoveToTop";
import LGSimulation from "./LGSimulation";

import openPitMineImg from "./openPitMineFig.png";
import maxClosureImg from "./maxClosureFig.svg";
import movingConeAlgoImg from "./movingConeAlgoFig.png";

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
      <img
        src={props.src}
        className={classes.articleImage}
        style={props.maxHeight ? { maxHeight: props.maxHeight } : null}
      />
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

        <h1 className={classes.title}>Optimal Pit Mining</h1>
      </div>
      <div className={classes.body}>
        <div className={classes.section}>
          <H1>Lets get your hands dirty</H1>
          <Text>
            {/* To be Modified */}
            Imagine Playing MineCraft on Hardcore and, what if i tell you I can
            help you toggle on cheats and see right through the ground and find
            the sweet sweet Diamond Ore you have been looking for. But just like
            everything in LIFE there is catch...... You will have to pay for all
            the digging you do......... All the best peps go MAXIMISE your
            PROFITS ..... LETS MINECRAFT!
          </Text>
          <LGSimulation className={classes.simulator} />
        </div>
        <div className={classes.section}>
          <H1>A boon from the past</H1>
          <Text>
            It was 2 AM, the clock was ticking, when the whole country was
            sleeping, Bhagyanagara kingdom didn't wish for the sun to rise.
            Because they knew it, that's going to be one of the terrific wars of
            all times.
          </Text>
          <Text>
            As the enemy was approaching there was anxiety all over the kingdom.
            But the king was there, standing, with impregnable confidence,
            plumed and armored.
          </Text>
          <Text>
            The least he knew, he was going to witness the greatest sin{" "}
            <b>THE BETRAYAL</b>.
          </Text>
          <Text>
            Blood. Blood. Blood everywhere. It was a grey afternoon with a dull
            sky, the queen knew that they were going to lose. But she didn't
            want the treasury to be taken away by those white-people. And then
            she and along with some helpers to bury all the treasury.
          </Text>
          <H3>200 years later</H3>
          <Text>
            Stock markets collapsed, coronavirus has completely destroyed the
            economic situation, poor became poorer. Then came this discovery of
            mine as a boon to the government. Hence the government wants to get
            the maximum profit out of it with minimal expenditure.
          </Text>
          <H1>General Background</H1>
          <Text>
            Mineral deposits are generally extracted from the earth either by
            underground or surface mining methods with the objective of
            extracting the ore at a profit.
          </Text>
          <Text>
            Open pit mining is one of the most-important methods of surface
            mining in which any waste material or overburden is stripped and
            transported to a waste dump prior to, and sometimes during, mining
            in order to uncover, and gain access to the mineral deposit. In
            general, mining proceeds from the top to the bottom of the ore-body.
          </Text>
          <Text>
            The use of open pit mining has increased to extract large and low
            grade deposits with the growth in demand for raw materials, with the
            advances in mining technology and with the depletion of high grade
            and readily accessible orebodies. Development and extraction of
            minerals by this method is a complex operation that may extend over
            several decades and require very large investments. Before starting
            the operation, it is necessary to design the size and final shape of
            the pit in order to determine mineable reserves and amount of waste
            to be removed.
          </Text>
          <Text>
            A number of algorithms such as the various versions of the moving
            cone method, Lerchs-Grossmann algorithm, network or maximal flow
            techniques, Korobov algorithm, dynamic programming and
            parameterization techniques have been developed to determine the
            optimum ultimate pit limit since the advent and widespread use of
            computers. The main objective of these algorithms is to determine
            the optimum pit limit in order to maximise the overall mining profit
            within the designed pit limit subject to the mining constraints.{" "}
          </Text>
          <Text>
            Almost all computer algorithms of optimal design except the
            parameterization approach use a net profit as a criteria and their
            objective is to find the ultimate pit limit that maximises the net
            profit. Ideally, optimal pit limits must be determined on the basis
            of maximising net present value. As Whittle (1989) stated and
            paraphrased by Dowd and Onur (1993): "The pit- outline with the
            highest net present value can not be determined until the block
            values are known; the block values are not known until a mining
            sequence is specified; and a mining sequence can not be specified
            until a pit "outline is available". Thus the problem is intractable.
          </Text>
          <ImgDiv
            src={openPitMineImg}
            caption={"A vertical section through a hypothetical open pit mine"}
          />
          <Text>
            Computer algorithms for open pit design use block models of the
            ore-body which are either
            <ul>
              <li>
                <b>Block grade model:</b> obtained by considering the deposit as
                a large box, covering the entire ore-body, and then subdividing
                it into smaller blocks and assigning estimated grades to each
                block. <b>OR</b>
              </li>
              <li>
                <b>Revenue block model:</b> created by applying costs and prices
                to the grade block model of the deposit.
              </li>
            </ul>
          </Text>
          <MarkPara>
            To determine a net value of each block: <br />
            <Mark>NV = R - C</Mark>
            <br />
            Where NV is the net value of a block <br />
            R is the recoverable metal value <br />C is the cost of mining and
            processing
          </MarkPara>
          <Text>
            In the revenue block model of the deposit air blocks, have a zero
            value, waste blocks have a negative value representing the stripping
            cost and the ore block with sufficient grade have a positive value.
            A mine may consist of a large number of blocks each of which with an
            estimated grade or net profit. Since not all blocks are extracted,
            the objective of optimal pit design now can be defined as selecting
            a set of blocks which should be mined to maximise some criteria such
            as net profit or metal content.
          </Text>
          <Text>
            The most common optimal design methods may be listed as follows:
            <ul>
              <li>Graph theory</li>
              <li>Network or maximal flow techniques</li>
              <li>Various versions of floating or moving cone</li>
              <li>Korobov algorithm</li>
              <li>Dynamic programming</li>
              <li>Parameterization techniques</li>
            </ul>
          </Text>
          <h1>Graph theory</h1>
          <Text>
            Although many algorithms have been developed since 1965, only the
            Lerchs-Grossmann method (1965), based on graph theory, can be
            proved, rigorously, always to yield the optimal solution. However,
            disadvantages of this approach are complexity of the method,
            computing time and difficulty in incorporating variable pit-slopes.
          </Text>
          <Text>
            This method converts the revenue block model of the deposit into a
            directed graph which is a simple diagram consisting of a set of
            small squares, called nodes or vertices, and a set of connecting
            arcs (lines with direction) used to indicate the relationship
            between the vertices.
          </Text>
          <Text>
            A vertex represents each block. Each vertex is assigned a mass that
            is equal to the net value of the corresponding block. Vertices are
            connected by arcs in such a way as to represent the mining
            constraints. These arcs indicate which blocks should be removed
            before a particular block can be mined. Figure below shows a
            directed two-dimensional graph example in which the pit slope angle
            is 45° and the blocks are squares. In this example, to mine block 1,
            it is first necessary to remove blocks 3,4 and 5.
          </Text>
          <ImgDiv
            src={maxClosureImg}
            caption={
              "Computing the maximum closure would give you maximum profit"
            }
          />
          <Text>
            The value of a closure is the sum of the masses of the vertices
            within it. A maximum closure of the graph is the solution. Therefore
            this algorithm involves the finding of the maximum closure of the
            graph, in other words, the set of vertices or blocks yielding the
            maximum total value of the deposit.
          </Text>
          <H3>Limitations</H3>
          <Text>
            This algorithm is the only method that can be proved rigorously,
            always to yield the true optimum pit. However, due to the
            disadvantages, such as complexity of the method, computing time and
            difficulty to incorporate variable pit slopes, many workers have
            continued to seek alternative methods.
          </Text>
          <Text>
            The original formulation of the Lerchs-Grossmann algorithm was
            limited to one vertex to the left, one vertex to the right and one
            vertex above to define mining constraints (and, implicitly, pit
            slopes) which makes it difficult to incorporate variable slope
            angles. This procedure implicitly assumes that the dimensions of the
            blocks determine the pit slope.
          </Text>
          <H1>Floating or Moving Cone method</H1>
          <Text>
            The floating, or moving, cone approach is the simplest method for
            determining the optimal pit outline and it is perhaps the most
            popular and widely used of heuristic algorithms. This method, which
            is the most common alternative to the Lerchs Grossman algorithm,
            works on a revenue block model of the deposit.
          </Text>
          <Text>
            The floating, or moving, cone method involves, for-each positive
            (ore) block, constructing a cone, with sides oriented parallel to
            the pit slope angles, and then determining the value of the cone by
            summing the values of blocks enclosed within it.
          </Text>
          <Text>
            If the value of the cone is positive, all blocks within the cone are
            mined. This process starts from the uppermost level and moves
            downward searching for positive blocks. The process continues until
            no positive cones remain in the block model. A flow-chart of the
            algorithm for this method is shown in Figure.
          </Text>
          <Text>
            The method is very simple, is easy to program and reaches a solution
            in a shorter time than any other method and is an order of magnitude
            faster than the Lerchs Grossman algorithm. These methods do not,
            however, always yield a true optimum.
          </Text>
          <ImgDiv
            src={movingConeAlgoImg}
            caption={"Moving cone method"}
            maxHeight={"800px"}
          />
          <H3></H3>
          <Text>
            The problem with this method is that it produces different results
            depending upon the direction of search for the ore blocks.
          </Text>
          <Text>
            This method may, therefore, produce a different ultimate pit limit
            for the same deposit depending on the selected starting point.
            Lemieux (1979) proposed a number of techniques to overcome these
            problems, but the various forms of the floating cone method remain
            heuristic due to the lack of any mathematical proof.
          </Text>
          <H1>References</H1>
          <ul>
            <li>
              <a
                href="https://core.ac.uk/download/pdf/9554758.pdf"
                target="_blank"
              >
                https://core.ac.uk/download/pdf/9554758.pdf
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=2__ITWsT4GA&t=2s&ab_channel=YovaniAchataFlores"
                target="_blank"
              >
                https://www.youtube.com/watch?v=2__ITWsT4GA&t=2s&ab_channel=YovaniAchataFlores
              </a>
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Closure_problem"
                target="_blank"
              >
                https://en.wikipedia.org/wiki/Closure_problem
              </a>
            </li>
          </ul>
        </div>
      </div>
      <MoveToTop />
    </div>
  );
};

export default ArticleComponent;
