import React from "react";
import { Grid } from "@material-ui/core";
import styles from "../../../styles";

import Opener from "../../opener";
import { connect } from "react-redux";
import { getOpeningOutline } from "../../../app/selectors";

const OpeningPage = ({ data }) => {
  const classes = styles.gridWrapperStyles();
  return (
    <Grid className={classes.grid}>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getOpeningOutline(state),
});

export default connect(mapStateToProps)(OpeningPage);
