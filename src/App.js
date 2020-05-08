import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import classNames from "classnames";

import "./App.css";
import Navigator from "./components/navigation";
import OpeningPage from "./components/pages/opening";
import GenderPage from "./components/pages/gender";
import CircumstancesPage from "./components/pages/circumstances";
import TreatmentPage from "./components/pages/treatment";
import ArmamentsPage from "./components/pages/armaments";
import SkillsPage from "./components/pages/skills";
import MountsPage from "./components/pages/mounts";
import DeputiesPage from "./components/pages/deputies";
import OfficePage from "./components/pages/office";
import DrawbacksPage from "./components/pages/drawbacks";
import EventsPage from "./components/pages/events";
import { getSections, getPoints } from "./app/selectors";
import styles from "./styles";

function App() {
  const classes = styles.appStyles();
  return (
    <div className={classNames(classes.div, "App")}>
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
            <MountsPage />
          </Route>
          <Route path="/deputies">
            <DeputiesPage />
          </Route>
          <Route path="/office">
            <OfficePage />
          </Route>
          <Route path="/drawbacks">
            <DrawbacksPage />
          </Route>
          <Route path="/events">
            <EventsPage />
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
