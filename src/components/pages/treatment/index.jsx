import React from "react";
import { Grid } from "@material-ui/core";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import {
  getTreatmentOutline,
  getTreatmentChoices,
} from "../../../app/selectors";
import { updateTreatment } from "../../../app/actions";

const TreatmentPage = ({ data, decisions, updateTreatment }) => {
  console.log(data.toJS());
  return (
    <Grid>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList
        choices={data.get("choices")}
        decisions={decisions.toJS()}
        handleClick={updateTreatment}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getTreatmentOutline(state),
  decisions: getTreatmentChoices(state),
});

export default connect(mapStateToProps, { updateTreatment })(TreatmentPage);
