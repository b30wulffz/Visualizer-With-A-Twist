import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import MoveToTop from "../../components/MoveToTop";
import BoidsSimulation from "./BoidsSimulation";

// import pizzaImg from "./pizza-fig.svg";
// import mstImg from "./mst-fig.svg";
// import partialHamiltonianFig from "./partial-hamiltonian-fig.svg";
// import hamiltonianFig from "./hamiltonian-fig.svg";

const useStyles = makeStyles((theme) => ({
  titleBlock: {
    height: "40vh",
    background: "linear-gradient(-45deg, #F6FBA2, #20DED3)",
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
      color: "#20DED3", // second color of gradient
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
    // background: "#F2F3F4",
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
    borderLeft: "5px solid #20DED3", // second color of gradient
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

        <h1 className={classes.title}>Boid's Algorithm</h1>
      </div>
      <div className={classes.body}>
        <div className={classes.section}>
          <H1>Lets get your hands dirty</H1>
          <Text>
            This is an amazing visualization of automating drones to form a
            flock similar to that of a bird. This uses Boid's algorithm and
            searchs for lost skiers in the valley. Yes, in this visualization,
            drones coordinate within themselves.
          </Text>
          <BoidsSimulation className={classes.simulator} />
        </div>
        <div className={classes.section}>
          <H1>What is Boid's Algorithm?</H1>
          <Text>
            Boids is an artificial life program, developed by Craig Reynolds in
            1986, which simulates the flocking behaviour of birds. The name
            "boid" corresponds to a shortened version of "bird-oid object",
            which refers to a bird-like object. Instead of controlling the
            interactions of an entire flock, however, the Boids simulation only
            specifies the behavior of each individual bird.
          </Text>
          <H3>Swarm Intelligence</H3>
          <Text>
            Boids is only one of many experiments in what is known as the field
            of "swarm intelligence". A key aspect of swarm intelligence systems
            is the lack of a centralized control agent--instead each individual
            unit in the swarm follows its own defined rules, sometimes resulting
            in surprising overall behavior for the group as a whole.
          </Text>
          <H3>Features of a basic Boids Algorithm</H3>
          <Text>
            As with most artificial life simulations, Boids is an example of
            emergent behavior; that is, the complexity of Boids arises from the
            interaction of individual agents (the boids, in this case) adhering
            to a set of simple rules.
          </Text>
          <Text>
            The Boids program consists of a group of objects (birds) that each
            have their own position, velocity, and orientation. There are only 3
            rules which specify the behavior of each bird.
          </Text>
          <Text>
            The rules applied in the simplest Boids world are as follows:
            <ul>
              <li>
                <b>separation:</b> steer to avoid crowding local flockmates
              </li>
              <li>
                <b>alignment:</b> steer towards the average heading of local
                flockmates
              </li>
              <li>
                <b>cohesion:</b> steer to move towards the average position
                (center of mass) of local flockmates
              </li>
            </ul>
          </Text>
          <H3>Usage</H3>
          <Text>
            The boids framework is often used in computer graphics, providing
            realistic-looking representations of flocks of birds and other
            creatures, such as schools of fish or herds of animals.
          </Text>
          <Text>
            The Boids model can be used for direct control and stabilization of
            teams of simple Unmanned Ground Vehicles (UGV) or Micro Aerial
            Vehicles (MAV) in swarm robotics. For stabilization of heterogeneous
            UAV-UGV teams, the model was adapted for using onboard relative
            localization by Saska et al.
          </Text>
          <Text>
            It has been applied to automatically program Internet multi-channel
            radio stations. It has also been used for visualizing information
            and for optimization tasks.
          </Text>
          <H1>Pseudo code</H1>
          <Text>The boids program has the following structure:</Text>
          <CodeBlock>
            {`initialise_positions()
  
LOOP
  draw_boids()
	move_all_boids_to_new_positions()
END LOOP`}
          </CodeBlock>
          <Text>
            The initialise_positions() procedure puts all the boids at a
            starting position. we put them all at random locations off-screen to
            start with, that way when the simulation starts they all fly in
            towards the middle of the screen, rather than suddenly appearing in
            mid-air.
          </Text>
          <Text>
            The draw_boids() procedure simply draws one 'frame' of the
            animation, with all the boids in their current positions. The
            procedure we have called move_all_boids_to_new_positions() contains
            the actual boids algorithm. Note that all it involves is simple
            vector operations on the positions of the boids. Each of the boids
            rules works independently, so, for each boid, you calculate how much
            it will get moved by each of the three rules, giving you three
            velocity vectors. Then you add those three vectors to the boid's
            current velocity to work out its new velocity. Interpreting the
            velocity as how far the boid moves per time step we simply add it to
            the current position, arriving at the following pseudo-code:
          </Text>
          <CodeBlock>
            {`PROCEDURE move_all_boids_to_new_positions()

  Vector v1, v2, v3
  Boid b

  FOR EACH BOID b
    v1 = rule1(b)
    v2 = rule2(b)
    v3 = rule3(b)

    b.velocity = b.velocity + v1 + v2 + v3
    b.position = b.position + b.velocity
  END

END PROCEDURE`}
          </CodeBlock>
          <H3>
            Rule 1: Boids try to fly towards the centre of mass of neighbouring
            boids.
          </H3>
          <Text>
            The 'centre of mass' is simply the average position of all the
            boids. we use the term centre of mass by analogy with the
            corresponding physical formula (however we ignore individual masses
            here and treat all boids having the same mass).
          </Text>
          <Text>
            Assume we have N boids, called b[1], b[2], ..., b[N]. Also, the
            position of a boid b is denoted b.position. Then the 'centre of
            mass' c of all N boids is given by:
          </Text>
          <MarkPara>
            c = (b[1].position + b[2].position + ... + b[N].position) / N
          </MarkPara>
          <Text>
            Remember that the positions here are vectors, and N is a scalar.
          </Text>
          <Text>
            {`However, the 'centre of mass' is a property of the entire flock; it is not something that would be considered by an individual boid. we prefer to move the boid toward its 'perceived centre', which is the centre of all the other boids, not including itself. Thus, for boidJ (1 <= J <= N), the perceived centre pc[J] is given by:`}
          </Text>
          <MarkPara>
            pc[J] = (b[1].position + b[2].position + ... + b[J-1].position +
            b[J+1].position + ... + b[N].position) / (N-1)
          </MarkPara>
          <Text>
            Having calculated the perceived centre, we need to work out how to
            move the boid towards it. To move it 1% of the way towards the
            centre (this is about the factor we use) this is given by (pc[J] -
            b[J].position) / 100.
          </Text>
          <Text>Summarising this in pseudocode:</Text>
          <CodeBlock>
            {`PROCEDURE rule1(boid b[J])

  Vector pc[J]

  FOR EACH BOID b
    IF b != b[J] THEN
      pc[J] = pc[J] + b.position
    END IF
  END

  pc[J] = pc[J] / N-1

  RETURN (pc[J] - b[J].position) / 100

END PROCEDURE`}
          </CodeBlock>
          <Text>
            Thus we have calculated the first vector offset, v1, for the boid.
          </Text>
          <H3>
            Rule 2: Boids try to keep a small distance away from other objects
            (including other boids).
          </H3>
          <Text>
            The purpose of this rule is for boids to make sure they don't
            collide into each other. we simply look at each boid, and if it's
            within a defined small distance (say 100 units) of another boid move
            it as far away again as it already is. This is done by subtracting
            from a vector c the displacement of each boid which is near by. We
            initialise c to zero as we want this rule to give us a vector which
            when added to the current position moves a boid away from those near
            it.
          </Text>
          <Text>In pseudocode:</Text>
          <CodeBlock>
            {`PROCEDURE rule2(boid b[J])

  Vector c = 0;

  FOR EACH BOID b
    IF b != b[J] THEN
      IF |b.position - b[J].position| < 100 THEN
        c = c - (b.position - b[J].position)
      END IF
    END IF
  END

  RETURN c

END PROCEDURE`}
          </CodeBlock>
          <Text>
            It may seem odd that we choose to simply double the distance from
            nearby boids, as it means that boids which are very close are not
            immediately "repelled". Remember that if two boids are near each
            other, this rule will be applied to both of them. They will be
            slightly steered away from each other, and at the next time step if
            they are still near each other they will be pushed further apart.
            Hence, the resultant repulsion takes the form of a smooth
            acceleration. It is a good idea to maintain a principle of ensuring
            smooth motion. If two boids are very close to each other it's
            probably because they have been flying very quickly towards each
            other, considering that their previous motion has also been
            restrained by this rule. Suddenly jerking them away from each other,
            such that they each have their motion reversed, would appear
            unnatural, as if they bounced off each other's invisible force
            fields. Instead, we have them slow down and accelerate away from
            each other until they are far enough apart for our liking.
          </Text>
          <H3>Rule 3: Boids try to match velocity with near boids.</H3>
          <Text>
            This is similar to Rule 1, however instead of averaging the
            positions of the other boids we average the velocities. We calculate
            a 'perceived velocity', pv[J], then add a small portion (about an
            eighth) to the boid's current velocity.
          </Text>
          <CodeBlock>
            {`PROCEDURE rule3(boid b[J])

  Vector pv[J]

  FOR EACH BOID b
    IF b != b[J] THEN
      pv[J] = pv[J] + b.velocity
    END IF
  END

  pv[J] = pv[J] / N-1

  RETURN (pv[J] - b[J].velocity) / 8

END PROCEDURE`}
          </CodeBlock>
          <H1>Real World Implementation</H1>
          <H3>Spotting Survivors in Disaster prone areas using Drones</H3>
          <Text>
            We make use of the boids algorithm in a real world problem posed as:
          </Text>
          <Text>
            It’s 2025, a massive earthquake has rocked a large part of the
            southern subcontinent of India, leading to a mass wreckage and
            rendering thousands homeless. Counting casualties and spotting
            survivors in the area has become difficult due to the vast amount of
            dust that has risen into the air.{" "}
          </Text>
          <Text>
            As the armed forces come to the rescue aided by NGOs and public
            fundings, we are desperately searching for a method to spot the
            survivors and rescue them. The infrared drones do a very good work
            for spotting these people but the amount of drones needed and the
            manual control is a major drawback. Resulting in collisions and a
            further loss in assets.
          </Text>
          <Text>
            On the commander’s demands for a swift and efficient algorithm to
            avoid these mishaps, one intern came up with the implementation of
            the Boids algorithm on the drones. Capable of automated flying,
            these drones would now mimic the behaviour of migratory birds, with
            the initial requirements of Boids along with an increased
            functionality of spotting survivors and sending the location using
            GPS signal to the rescue team.
          </Text>
          <Text>
            In this implementation, we only show the ability of the drones to
            fly without collision, moving apart and in groups as required.
          </Text>
        </div>
      </div>
      <MoveToTop />
    </div>
  );
};

export default ArticleComponent;
