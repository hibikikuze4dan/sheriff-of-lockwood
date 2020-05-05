import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import { getPoints } from "../../app/selectors";

const ApplicationBar = ({ points, handleIconButtonClick, open }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container justify="space-between">
          <IconButton onClick={() => handleIconButtonClick(!open)}>
            <MenuIcon />
          </IconButton>
          <Typography style={{ alignSelf: "center" }}>{points}</Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

ApplicationBar.defaultProps = {
  handleIconButtonClick: () => null,
  open: false,
  points: 0,
};

const mapStateToProps = (state) => ({
  points: getPoints(state),
});

export default connect(mapStateToProps)(ApplicationBar);
