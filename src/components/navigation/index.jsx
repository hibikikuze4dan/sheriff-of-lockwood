import React, { useState } from "react";

import AppBar from "../application-bar";
import Drawer from "../drawer";

const Navigator = () => {
  const [open, toggleDrawer] = useState(false);
  const [openDialog, toggleDialog] = useState(false);

  return (
    <span>
      <AppBar
        handleIconButtonClick={toggleDrawer}
        handleDialogToggle={toggleDialog}
        open={open}
        openDialog={openDialog}
      />
      <Drawer handleBackgroundClick={toggleDrawer} open={open} />
    </span>
  );
};

export default Navigator;
