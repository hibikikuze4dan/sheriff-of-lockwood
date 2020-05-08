import React from "react";
import { Grid } from "@material-ui/core";
import styles from "../../../styles";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import { getOfficeOutline, getOfficeChoices } from "../../../app/selectors";
import { updateOffice } from "../../../app/actions";

const OfficePage = ({ data, decisions, updateOffice }) => {
  const classes = styles.gridWrapperStyles();
  return (
    <Grid className={classes.grid}>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList
        choices={data.get("choices")}
        decisions={decisions.toJS()}
        handleClick={updateOffice}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getOfficeOutline(state),
  decisions: getOfficeChoices(state),
});

export default connect(mapStateToProps, { updateOffice })(OfficePage);
