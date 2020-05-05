import React, { useState } from "react";

import AppBar from "../application-bar";
import Drawer from "../drawer";

const Navigator = () => {
  const [open, toggleDrawer] = useState(false);
  return (
    <span>
      <AppBar handleIconButtonClick={toggleDrawer} open={open} />
      <Drawer handleBackgroundClick={toggleDrawer} open={open} />
    </span>
  );
};

export default Navigator;
