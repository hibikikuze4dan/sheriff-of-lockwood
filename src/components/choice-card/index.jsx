import React from "react";
import {
  Button,
  Card,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import Interweave from "interweave";
import Img from "react-image";

import { extractRequirements } from "../../app/utils";
import styles from "../../styles";
import { useSelector } from "react-redux";
import { getLocation } from "../../app/selectors";
import { newImages } from "../../data/new-image-links";

const ChoiceCard = ({ handleClick, choice, picked, index }) => {
  const section = useSelector(getLocation);
  const classes = styles.cardStyles();
  const cost = choice?.cost;
  const src = choice?.src;
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

  let imageSection = null;
  if (src) {
    imageSection = (
      <Grid item xs={12}>
        <Grid container justify="center">
          <Img
            style={{ height: "300px", width: "100%", objectFit: "fill" }}
            src={newImages?.[section]?.[index]}
            loader={<CircularProgress />}
            unloader={<CircularProgress />}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Button
      style={{ backgroundColor: picked ? "green" : "white", height: "100%" }}
      component={Card}
      onClick={() => handleClick(choice, picked)}
      classes={{ root: classes.button, label: classes.label }}
    >
      <Grid container>
        {/* TODO: Uncomment when you add back the right images */}
        {imageSection}
        <Grid item xs={12} style={{ paddingBottom: "1rem" }}>
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
