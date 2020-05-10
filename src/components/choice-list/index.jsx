import React, { Fragment } from "react";
import {
  GridList,
  GridListTile,
  withWidth,
  Grid,
  IconButton,
} from "@material-ui/core";
import { map, includes } from "lodash";
import ArrowRight from "@material-ui/icons/ArrowForward";
import ArrowLeft from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ChoiceCard from "../choice-card";
import { getRelativeSections } from "../../app/selectors";
import { updateLocation } from "../../app/actions";

const columns = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 3,
};

const ChoiceCardList = ({
  choices,
  decisions,
  width,
  handleClick,
  relativeSections,
  updateLocation,
}) => {
  return (
    <Fragment>
      <GridList cols={columns[width]} cellHeight="auto" spacing={16}>
        {map(choices.toJS(), (choice, index) => {
          console.log(choice);
          return (
            <GridListTile key={choice.title}>
              <ChoiceCard
                choice={choice}
                handleClick={handleClick}
                picked={includes(decisions, choice.title)}
              />
            </GridListTile>
          );
        })}
      </GridList>
      <Grid
        container
        justify="space-between"
        style={{ padding: "16px 0 32px 0" }}
      >
        <Grid item xs={6}>
          <Grid container alignContent={"center"} style={{ height: "100%" }}>
            <IconButton
              component={Link}
              to={relativeSections[0]}
              disabled={relativeSections[0] === ""}
              onClick={() => {
                window.scrollTo(0, 0);
                return updateLocation(relativeSections[0]);
              }}
            >
              <ArrowLeft />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            alignContent={"center"}
            justify="flex-end"
            style={{ height: "100%" }}
          >
            <IconButton
              component={Link}
              to={relativeSections[1]}
              disabled={relativeSections[1] === ""}
              onClick={() => {
                window.scrollTo(0, 0);
                return updateLocation(relativeSections[1]);
              }}
            >
              <ArrowRight />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

ChoiceCardList.defaultProps = {
  choices: [],
  handleClick: () => null,
};

const mapStateToProps = (state) => ({
  relativeSections: getRelativeSections(state),
});

export default connect(mapStateToProps, { updateLocation })(
  withWidth()(ChoiceCardList)
);
