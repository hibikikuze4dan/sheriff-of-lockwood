import React from "react";
import { Drawer, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSections, getSectionsFormattedTitle } from "../../app/selectors";

const NavigationDrawer = ({
  formattedSections,
  handleBackgroundClick,
  open,
  sections,
}) => {
  return (
    <Drawer
      open={open}
      ModalProps={{ onBackdropClick: () => handleBackgroundClick(!open) }}
    >
      {formattedSections.map((section, index) => {
        return (
          <Button component={Link} to={sections[index]}>
            <Typography>{section}</Typography>
          </Button>
        );
      })}
    </Drawer>
  );
};

NavigationDrawer.defaultProps = {
  formattedSections: [],
  handleBackgroundClick: () => null,
  open: true,
  sections: [],
};

const mapStateToProps = (state) => ({
  sections: getSections(state),
  formattedSections: getSectionsFormattedTitle(state),
});

export default connect(mapStateToProps)(NavigationDrawer);
