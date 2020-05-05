import React from "react";
import { Button, Card, Typography, Grid } from "@material-ui/core";
import Interweave from "interweave";

import { extractRequirements } from "../../app/utils";

const ChoiceCard = ({ handleClick, choice, picked }) => {
  const cost = choice?.cost;
  const requirements = extractRequirements(choice);
  const required = choice?.required;
  const weight = choice?.weight;
  const unique = choice?.unique;

  let costSection = null;
  if (cost) {
    if (cost > 0) {
      costSection = <Typography>{`(Cost: ${cost})`}</Typography>;
    } else {
      costSection = <Typography>{`(Gain: ${Math.abs(cost)})`}</Typography>;
    }
  }

  let requirementsSection = null;
  if (requirements.length > 0) {
    requirementsSection = (
      <Typography>{`(${requirements[0]} Only)`}</Typography>
    );
  }

  return (
    <Button
      style={{ backgroundColor: picked ? "green" : "white" }}
      component={Card}
      onClick={() => handleClick(choice)}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography>
            <Interweave content={choice.title} />
          </Typography>
          {requirementsSection}
          {unique && <Typography>(Unique)</Typography>}
          {weight && <Typography>{`(${weight})`}</Typography>}
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <Interweave content={choice.text} />
          </Typography>
          {costSection}
          {required && <Typography>(Required)</Typography>}
        </Grid>
      </Grid>
    </Button>
  );
};

ChoiceCard.defaultProps = {
  handleClick: () => null,
  picked: false,
};

export default ChoiceCard;
