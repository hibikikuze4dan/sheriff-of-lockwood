import React from "react";
import { Grid } from "@material-ui/core";
import styles from "../../../styles";
import { connect } from "react-redux";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import {
  getCircumstancesOutline,
  getCircumstancesChoices,
} from "../../../app/selectors";
import { updateCircumstances } from "../../../app/actions";

const CircumstancesPage = ({ data, updateCircumstances, decisions }) => {
  const classes = styles.gridWrapperStyles();
  return (
    <Grid className={classes.grid}>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList
        choices={data.get("choices")}
        handleClick={updateCircumstances}
        decisions={decisions.toJS()}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getCircumstancesOutline(state),
  decisions: getCircumstancesChoices(state),
});

export default connect(mapStateToProps, { updateCircumstances })(
  CircumstancesPage
);
