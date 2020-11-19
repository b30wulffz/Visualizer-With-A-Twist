import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Home from "./Home";
import TspSimulation from "./TspSimulation";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/tsp" exact>
          <Home />
        </Route>
        <Route path="/tsp-sim" exact>
          <TspSimulation />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
