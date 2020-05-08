import React from "react";
import { Button, Card, Typography, Grid } from "@material-ui/core";
import Interweave from "interweave";

import { extractRequirements } from "../../app/utils";
import styles from "../../styles";

const ChoiceCard = ({ handleClick, choice, picked }) => {
  const classes = styles.cardStyles();
  const cost = choice?.cost;
  const requirements = extractRequirements(choice);
  const required = choice?.required;
  const weight = choice?.weight;
  const unique = choice?.unique;

  let costSection = null;
  if (cost || cost === 0) {
    if (cost > 0) {
      costSection = <Typography>{`(Cost: ${cost})`}</Typography>;
    } else if (cost < 0) {
      costSection = <Typography>{`(Gain: ${Math.abs(cost)})`}</Typography>;
    } else {
      costSection = <Typography>{`(Free)`}</Typography>;
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
      onClick={() => handleClick(choice, picked)}
      className={classes.button}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.title}>
            <Interweave content={choice.title} />
          </Typography>
          {requirementsSection}
          {unique && <Typography>(Unique)</Typography>}
          {weight && <Typography>{`(${weight})`}</Typography>}
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.description}>
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
