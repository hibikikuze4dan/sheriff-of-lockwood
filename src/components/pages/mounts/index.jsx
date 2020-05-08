import React from "react";
import { Grid } from "@material-ui/core";
import styles from "../../../styles";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import { getMountsOutline, getMountsChoices } from "../../../app/selectors";
import { updateMounts } from "../../../app/actions";

const MountsPage = ({ data, updateMounts, decisions }) => {
  const classes = styles.gridWrapperStyles();
  return (
    <Grid className={classes.grid}>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList
        choices={data.get("choices")}
        decisions={decisions.toJS()}
        handleClick={updateMounts}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getMountsOutline(state),
  decisions: getMountsChoices(state),
});

export default connect(mapStateToProps, { updateMounts })(MountsPage);
