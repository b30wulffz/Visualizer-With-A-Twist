import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";

import Home from "./home/Home";
import TspSimulation from "./TspSimulation";
import LGSimulation from "./lerchs-grossman/LGSimulation";

function App() {
  return (
    <Router>
      <Navbar />
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
