import React from "react";
import { Grid } from "@material-ui/core";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import { getMountsOutline } from "../../../app/selectors";

const MountsPage = ({ data }) => {
  console.log(data.toJS());
  return (
    <Grid>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList choices={data.get("choices")} />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getMountsOutline(state),
});

export default connect(mapStateToProps)(MountsPage);
