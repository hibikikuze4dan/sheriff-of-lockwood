import { makeStyles } from "@material-ui/core/styles";

const appStyles = makeStyles({
  div: {
    backgroundColor: "#ECD078",
    textAlign: "center",
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

export default { applicationBarStyles, appStyles, dialogStyles };
