import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import cyoaText from "./data";
import Navigator from "./components/navigation";
import OpeningPage from "./components/pages/opening";
import GenderPage from "./components/pages/gender";
import CircumstancesPage from "./components/pages/circumstances";
import { getOutline, getSections, getPoints } from "./app/selectors";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigator />
        <Switch>
          <Route path="/opening">
            <OpeningPage />
          </Route>
          <Route path="/gender">
            <GenderPage />
          </Route>
          <Route path="/circumstances">
            <CircumstancesPage />
          </Route>
          <Route path="/treatment">
            <GenderPage />
          </Route>
          <Route path="/armaments">
            <GenderPage />
          </Route>
          <Route path="/skills">
            <GenderPage />
          </Route>
          <Route path="/mounts">
            <GenderPage />
          </Route>
          <Route path="/deputies">
            <GenderPage />
          </Route>
          <Route path="/office">
            <GenderPage />
          </Route>
          <Route path="/drawbacks">
            <GenderPage />
          </Route>
          <Route path="/events">
            <GenderPage />
          </Route>
          <Route render={() => <Redirect to="/opening" />} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  options: getSections(state),
  points: getPoints(state),
});

export default connect(mapStateToProps)(App);
