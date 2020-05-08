import React from "react";
import { Drawer, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getSections,
  getSectionsFormattedTitle,
  getLocation,
} from "../../app/selectors";
import { updateLocation } from "../../app/actions";
import styles from "../../styles";

const NavigationDrawer = ({
  formattedSections,
  handleBackgroundClick,
  open,
  sections,
  location,
  updateLocation,
}) => {
  const classes = styles.drawerStyles();

  return (
    <Drawer
      open={open}
      ModalProps={{ onBackdropClick: () => handleBackgroundClick(!open) }}
      classes={{ paper: classes.drawer }}
    >
      {formattedSections.map((section, index) => {
        return (
          <Button
            key={`drawer-link-${index + 1}-${section}`}
            component={Link}
            onClick={() => {
              handleBackgroundClick(!open);
              return updateLocation(sections[index]);
            }}
            to={sections[index]}
            className={
              location === sections[index] ? classes.selectedButton : ""
            }
          >
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
  location: getLocation(state),
});

export default connect(mapStateToProps, { updateLocation })(NavigationDrawer);
