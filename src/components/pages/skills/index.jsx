import React from "react";
import { Grid } from "@material-ui/core";
import styles from "../../../styles";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import { getSkillsOutline, getSkillsChoices } from "../../../app/selectors";
import { updateSkills } from "../../../app/actions";

const SkillsPage = ({ data, decisions, updateSkills }) => {
  const classes = styles.gridWrapperStyles();
  return (
    <Grid className={classes.grid}>
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
