import React from "react";
import { Grid } from "@material-ui/core";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import {
  getDrawbacksOutline,
  getDrawbacksChoices,
} from "../../../app/selectors";
import { updateDrawbacks } from "../../../app/actions";

const DrawbacksPage = ({ data, decisions, updateDrawbacks }) => {
  console.log(data.toJS());
  return (
    <Grid>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList
        choices={data.get("choices")}
        decisions={decisions.toJS()}
        handleClick={updateDrawbacks}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getDrawbacksOutline(state),
  decisions: getDrawbacksChoices(state),
});

export default connect(mapStateToProps, { updateDrawbacks })(DrawbacksPage);
