import React from "react";
import { Grid } from "@material-ui/core";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import { getDeputiesOutline, getDeputiesChoices } from "../../../app/selectors";
import { updateDeputies } from "../../../app/actions";

const DeputiesPage = ({ data, updateDeputies, decisions }) => {
  console.log(data.toJS());
  return (
    <Grid>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList
        choices={data.get("choices")}
        decisions={decisions.toJS()}
        handleClick={updateDeputies}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getDeputiesOutline(state),
  decisions: getDeputiesChoices(state),
});

export default connect(mapStateToProps, { updateDeputies })(DeputiesPage);
