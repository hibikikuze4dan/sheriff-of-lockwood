import React from "react";
import { Grid } from "@material-ui/core";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import { getSkillsOutline, getSkillsChoices } from "../../../app/selectors";
import { updateSkills } from "../../../app/actions";

const SkillsPage = ({ data, decisions, updateSkills }) => {
  console.log(data.toJS());
  return (
    <Grid>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList
        choices={data.get("choices")}
        decisions={decisions.toJS()}
        handleClick={updateSkills}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getSkillsOutline(state),
  decisions: getSkillsChoices(state),
});

export default connect(mapStateToProps, { updateSkills })(SkillsPage);
