import React from "react";
import { Grid } from "@material-ui/core";

import Opener from "../../opener";
import { connect } from "react-redux";
import { getOpeningOutline } from "../../../app/selectors";

const OpeningPage = ({ data }) => {
  console.log(data.toJS());
  return (
    <Grid>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getOpeningOutline(state),
});

export default connect(mapStateToProps)(OpeningPage);
