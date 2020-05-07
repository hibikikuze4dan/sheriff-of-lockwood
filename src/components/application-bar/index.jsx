import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import { getPoints } from "../../app/selectors";
import Dialog from "../dialog";

const ApplicationBar = ({
  points,
  handleIconButtonClick,
  open,
  openDialog,
  handleDialogToggle,
}) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container justify="space-between">
          <IconButton onClick={() => handleIconButtonClick(!open)}>
            <MenuIcon />
          </IconButton>
          <Button onClick={() => handleDialogToggle(!openDialog)}>
            Breakdown
          </Button>
          <Typography style={{ alignSelf: "center" }}>{points}</Typography>
        </Grid>
      </Toolbar>
      <Dialog open={openDialog} handleClose={handleDialogToggle} />
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
