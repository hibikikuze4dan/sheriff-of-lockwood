import { makeStyles } from "@material-ui/core/styles";

const appStyles = makeStyles({
  div: {
    backgroundColor: "#ECD078",
    textAlign: "center",
    height: "100%",
  },
});

const applicationBarStyles = makeStyles({
  appBar: {
    backgroundColor: "#D95B43",
  },
  breakdownButton: {
    color: "white",
    fontWeight: "bold",
  },
  iconButton: {
    padding: "16px 16px 16px 0",
  },
});

const dialogStyles = makeStyles({
  dialog: {
    backgroundColor: "#ECD078",
  },
});

const gridWrapperStyles = makeStyles({
  grid: {
    padding: "16px",
    backgroundColor: "#ECD078",
  },
});

const cardStyles = makeStyles({
  button: {
    textTransform: "none",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1rem",
  },
});

export default {
  applicationBarStyles,
  appStyles,
  dialogStyles,
  gridWrapperStyles,
  cardStyles,
};
