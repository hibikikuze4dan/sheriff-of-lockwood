import React from "react";
import { Button, Card, Typography, Grid } from "@material-ui/core";
import Interweave from "interweave";

const ChoiceCard = ({ handleClick, choice }) => {
  return (
    <Button component={Card} onClick={() => handleClick()}>
      <Grid container>
        <Grid item xs={12}>
          <Typography>
            <Interweave content={choice.title} />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <Interweave content={choice.text} />
          </Typography>
        </Grid>
      </Grid>
    </Button>
  );
};

ChoiceCard.defaultProps = {
  handleClick: () => null,
};

export default ChoiceCard;
