import React from "react";
import { Grid } from "@material-ui/core";
import styles from "../../../styles";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import {
  getArmamentsOutline,
  getArmamentsChoices,
} from "../../../app/selectors";
import { updateArmaments } from "../../../app/actions";

const ArmamentsPage = ({ data, decisions, updateArmaments }) => {
  const classes = styles.gridWrapperStyles();
  return (
    <Grid className={classes.grid}>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList
        choices={data.get("choices")}
        decisions={decisions.toJS()}
        handleClick={updateArmaments}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getArmamentsOutline(state),
  decisions: getArmamentsChoices(state),
});

export default connect(mapStateToProps, { updateArmaments })(ArmamentsPage);
