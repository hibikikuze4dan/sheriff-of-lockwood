import React from "react";
import { Grid } from "@material-ui/core";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import { getTreatmentOutline } from "../../../app/selectors";

const TreatmentPage = ({ data }) => {
  console.log(data.toJS());
  return (
    <Grid>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList choices={data.get("choices")} />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getTreatmentOutline(state),
});

export default connect(mapStateToProps)(TreatmentPage);
