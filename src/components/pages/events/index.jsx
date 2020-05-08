import React from "react";
import { Grid } from "@material-ui/core";
import styles from "../../../styles";

import Opener from "../../opener";
import ChoiceList from "../../choice-list";
import { connect } from "react-redux";
import { getEventsOutline, getEventsChoices } from "../../../app/selectors";
import { updateEvents } from "../../../app/actions";

const EventsPage = ({ data, updateEvents, decisions }) => {
  const classes = styles.gridWrapperStyles();
  return (
    <Grid className={classes.grid}>
      <Opener title={data.get("title")} subtext={data.get("subtitle")} />
      <ChoiceList
        choices={data.get("choices")}
        decisions={decisions.toJS()}
        handleClick={updateEvents}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: getEventsOutline(state),
  decisions: getEventsChoices(state),
});

export default connect(mapStateToProps, { updateEvents })(EventsPage);
