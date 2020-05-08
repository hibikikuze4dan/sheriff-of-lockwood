import React from "react";
import { Grid } from "@material-ui/core";
import styles from "../../../styles";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import { getGenderOutline, getGenderChoices } from "../../../app/selectors";
import { updateGender } from "../../../app/actions";

const GenderPage = ({ data, updateGender, decisions }) => {
  const classes = styles.gridWrapperStyles();
  return (
    <Grid className={classes.grid}>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList
        choices={data.get("choices")}
        handleClick={updateGender}
        decisions={decisions.toJS()}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getGenderOutline(state),
  decisions: getGenderChoices(state),
});

export default connect(mapStateToProps, { updateGender })(GenderPage);
