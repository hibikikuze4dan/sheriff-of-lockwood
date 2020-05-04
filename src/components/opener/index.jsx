import React from "react";
import { Grid, Divider, Typography } from "@material-ui/core";
import Interweave from "interweave";

const Opener = ({ title, subtext }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>
          <Interweave content={title} />
        </Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <Typography>
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
