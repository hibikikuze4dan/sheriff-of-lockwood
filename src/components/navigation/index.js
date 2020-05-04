import React, { useState } from "react";

import AppBar from "../application-bar";
import Drawer from "../drawer";
import { Grid } from "@material-ui/core";

const Navigator = () => {
  const [open, toggleDrawer] = useState(false);
  return (
    <Grid>
      <AppBar handleIconButtonClick={toggleDrawer} open={open} />
      <Drawer handleBackgroundClick={toggleDrawer} open={open} />
    </Grid>
  );
};

export default Navigator;
