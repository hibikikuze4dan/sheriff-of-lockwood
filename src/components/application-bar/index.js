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
    <AppBar>
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
  points: 0,
  handleIconButtonClick: () => null,
  open: false,
};

const mapStateToProps = (state) => ({
  points: getPoints(state),
});

export default connect(mapStateToProps)(ApplicationBar);
