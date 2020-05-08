import React from "react";
import ChoiceCard from "../choice-card";
import { GridList, GridListTile, withWidth } from "@material-ui/core";
import { map, includes } from "lodash";

const columns = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 3,
};

const ChoiceCardList = ({ choices, decisions, width, handleClick }) => {
  return (
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
  );
};

ChoiceCardList.defaultProps = {
  choices: [],
  handleClick: () => null,
};

export default withWidth()(ChoiceCardList);
