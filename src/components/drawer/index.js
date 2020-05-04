import React from "react";
import { Drawer, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSections, getSectionsFormattedTitle } from "../../app/selectors";

const NavigationDrawer = ({
  sections,
  formattedSections,
  open,
  handleBackgroundClick,
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
  open: true,
  formattedSections: [],
  sections: [],
  handleBackgroundClick: () => null,
};

const mapStateToProps = (state) => ({
  sections: getSections(state),
  formattedSections: getSectionsFormattedTitle(state),
});

export default connect(mapStateToProps)(NavigationDrawer);
