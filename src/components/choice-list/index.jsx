import React from "react";
import ChoiceCard from "../choice-card";
import { GridList, GridListTile, withWidth } from "@material-ui/core";
import { map } from "lodash";

const columns = {
  xs: 1,
  sm: 1,
  md: 3,
  lg: 3,
  xl: 3,
};

const ChoiceCardList = ({ choices, width }) => {
  console.log(choices.toJS());
  return (
    <GridList cols={columns[width]} cellHeight="auto">
      {map(choices.toJS(), (choice, index) => {
        return (
          <GridListTile key={choice.title}>
            <ChoiceCard choice={choice} />
          </GridListTile>
        );
      })}
    </GridList>
  );
};

ChoiceCardList.defaultProps = {
  choices: [],
};

export default withWidth()(ChoiceCardList);
