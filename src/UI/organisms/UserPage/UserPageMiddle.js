import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

const columns = [
  { id: "UserID", label: "UserID", minWidth: 150 },
  { id: "Email", label: "Email", minWidth: 200 },
  {
    id: "LastLogin",
    label: "Last Login",
    minWidth: 150,
  },
  {
    id: "RegistrationDate",
    label: "Registration Date",
    minWidth: 150,
  },
  {
    id: "button",
    label: "-",
    minWidth: 250,
  },
];

function createData(UserID, Email, LastLogin, RegistrationDate, button) {
  return { UserID, Email, LastLogin, RegistrationDate, button };
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const rows = [
    createData("test", "test1@gmail.com", null, null, <Button>gg</Button>),
    createData("james", "rwandahm@gmail.com", null, null, null),
    createData("test0", "las@gmail.com", null, null, null),
    createData("test00", "test00@gmail.com", null, null, null),
    createData("test00011", "rwandahm11@gmaisd.com", null, null, null),
    createData("test1", "rwand2222@gmail.com", null, null, null),
    createData("hobada96", "hobada97@naver.com", null, null, null),
    createData("test2", "2341@wdkodw.coo.or2", null, null, null),
    createData("test01394", "kdow.kakao.kr", null, null, null),
    createData("test03", "lwpe.dow.rrr", null, null, null),
    createData("test0013", "rerwer@rlpe.com", null, null, null),
    createData("hobada99", "hobada96@neurotx.org", null, null, null),
    createData("hobadamm", "hobada98@neurotx.org", null, null, null),
  ];
  return (
    <Paper
      style={{ height: "70vh", width: "100%", backgroundColor: "#131313" }}
    >
      <TableContainer
        style={{
          width: "95%",
          height: "65vh",
          marginLeft: 50,
          backgroundColor: "#131313",
        }}
      >
        <Table>
          <TableHead style={{ backgroundColor: "#2877b9" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth, color: "white" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "#131313" }}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.UserID}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ color: "#c0c0c0" }}
                        >
                            {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{
          backgroundColor: "#131313",
          paddingRight: 20,
          color: "white",
          borderBottom: "2px solid #333333",
        }}
        component="div"
        rowsPerPageOptions={[10]}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}
