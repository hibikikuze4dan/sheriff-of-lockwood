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
import TreatmentPage from "./components/pages/treatment";
import ArmamentsPage from "./components/pages/armaments";
import SkillsPage from "./components/pages/skills";
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
            <TreatmentPage />
          </Route>
          <Route path="/armaments">
            <ArmamentsPage />
          </Route>
          <Route path="/skills">
            <SkillsPage />
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
