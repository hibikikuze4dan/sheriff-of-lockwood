import React from "react";
import { Grid, Divider, Typography } from "@material-ui/core";
import Interweave from "interweave";
import styles from "../../styles";

const Opener = ({ title, subtext }) => {
  const classes = styles.openerStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.title}>
          <Interweave content={title} />
        </Typography>
      </Grid>
      <Divider style={{ width: "100%", margin: "8px 0 16px 0" }} />
      <Grid item xs={12}>
        <Typography className={classes.description}>
          <Interweave content={subtext} />
        </Typography>
      </Grid>
    </Grid>
  );
};

Opener.defaultProps = {
  title: "Hello!",
  subtext: "Goodbye!",
};

export default Opener;
