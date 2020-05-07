import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Typography,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";

import { getSpendingBreakdown, getChoicesSections } from "../../app/selectors";
import BreakdownTable from "./breakdown-table";

const ChoicesDialog = ({ open, handleClose, breakdown, sections }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.only("xs"));
  console.log(breakdown, sections);
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      open={open}
      onClose={() => handleClose(!open)}
    >
      <DialogTitle>
        <Grid container justify="space-between">
          <Typography style={{ alignSelf: "center" }}>Choices Made</Typography>
          <IconButton onClick={() => handleClose(!open)}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <BreakdownTable breakdown={breakdown} sections={sections} />
      </DialogContent>
    </Dialog>
  );
};

ChoicesDialog.defaultProps = {
  open: false,
  handleClose: () => null,
};

const mapStateToProps = (state) => ({
  breakdown: getSpendingBreakdown(state),
  sections: getChoicesSections(state),
});

export default connect(mapStateToProps)(ChoicesDialog);
