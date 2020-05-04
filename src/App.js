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
import { getOutline, getSections, getPoints } from "./app/selectors";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigator />
        <Switch>
          <Route path="/opening">4</Route>
          <Route path="/gender">45</Route>
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
