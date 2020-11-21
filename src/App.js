import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import { makeStyles } from "@material-ui/core/styles";

import "./App.css";
import Navbar from "./components/Navbar";

// import * as loader from "./components/coder-coding.json";
import * as loader from "./components/cute-cat.json";

import Home from "./home/Home";
import TspSimulation from "./TspSimulation";
import LGSimulation from "./lerchs-grossman/LGSimulation";

// height: 100vh;
// width: 100%;
// display: flex;
// justify-content: center;
// align-items: center;
const useStyles = makeStyles((theme) => ({
  loading: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loader.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function App() {
  const classes = useStyles();

  const [load, setLoad] = useState({
    loaded: false,
    currClass: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setLoad({ loaded: true, currClass: "done" });
    }, 2000);
  }, []);

  return !load.loaded ? (
    // <Example type="bubbles" color="red" />
    <div className={classes.loading}>
      <FadeIn>
        <div className="loader">
          <Lottie options={defaultOptions} height={220} width={220} />
        </div>
      </FadeIn>
    </div>
  ) : (
    <Router>
      {/* <Navbar /> */}
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/tsp-sim" exact>
          <TspSimulation />
        </Route>
        <Route path="/lg-sim" exact>
          <LGSimulation />
        </Route>
        {/* <Route
          path="/boids-sim"
          render={() => (
            <Redirect
              to={{
                pathname: "./boids/boids.html",
              }}
            />
          )}
        /> */}
      </Switch>
    </Router>
  );
}

export default App;
