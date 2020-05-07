import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";

const BreakdownTable = ({ sections, breakdown }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Choice</TableCell>
            <TableCell align="right">Points Before</TableCell>
            <TableCell align="right">Choice Cost</TableCell>
            <TableCell align="right">Points After</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {breakdown.map((section, index) => {
            return section.map((choice) => {
              return (
                <TableRow key={`table-row-${choice.title}`}>
                  <TableCell component="th" scope="row">
                    {choice.title}
                  </TableCell>
                  <TableCell align="right">{choice.prev}</TableCell>
                  <TableCell align="right">{choice.cost}</TableCell>
                  <TableCell align="right">{choice.curr}</TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BreakdownTable;
