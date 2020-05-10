import React from "react";
import { Grid, Divider, Typography, IconButton } from "@material-ui/core";
import Interweave from "interweave";
import ArrowRight from "@material-ui/icons/ArrowForward";
import ArrowLeft from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import styles from "../../styles";
import { getRelativeSections } from "../../app/selectors";
import { updateLocation } from "../../app/actions";

const Opener = ({ title, subtext, relativeSections, updateLocation }) => {
  const classes = styles.openerStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="space-between">
          <Grid item xs={2}>
            <Grid container alignContent={"center"} style={{ height: "100%" }}>
              <IconButton
                component={Link}
                to={relativeSections[0]}
                disabled={relativeSections[0] === ""}
                onClick={() => updateLocation(relativeSections[0])}
              >
                <ArrowLeft />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.title}>
              <Interweave content={title} />
            </Typography>
          </Grid>
          <Grid item xs={2}>
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
                onClick={() => updateLocation(relativeSections[1])}
              >
                <ArrowRight />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
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

const mapStateToProps = (state) => ({
  relativeSections: getRelativeSections(state),
});

export default connect(mapStateToProps, { updateLocation })(Opener);
