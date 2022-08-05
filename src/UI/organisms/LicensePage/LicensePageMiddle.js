import * as React from "react";
import {
  Button,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: 400,
  bgcolor: "#383b40",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "Serial", label: "Serial", minWidth: 50 },
  { id: "licensekey", label: "license key", minWidth: 250 },
  {
    id: "usedby",
    label: "used by",
    minWidth: 100,
  },
  {
    id: "usedfrom",
    label: "used from",
    minWidth: 150,
  },
  {
    id: "button",
    label: "-",
    minWidth: 100,
  },
];

function createData(Serial, licensekey, usedby, usedfrom, button) {
  return { Serial, licensekey, usedby, usedfrom, button };
}

export default function LicensePageMiddle() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([
    createData(
      1,
      "89c942bc-dcfd-431a-af3d-fc4c20619b68",
      "hobada9600",
      "2021-10-06T14:39:34",
      null
    ),
    createData(
      2,
      "37a383b4-3a19-4029-b5a6-3c07833c7122",
      "test999",
      "2021-09-03T09:48:35",
      null
    ),
    createData(
      3,
      "4db8cfc7-2987-491a-9fd7-d4492c46b5c4",
      "test2",
      "2021-06-02T20:13:57",
      null
    ),
    createData(
      4,
      "0893f285-c63b-4419-80df-fdbcaa214b2d",
      "test000112",
      "2021-05-15T21:05:56",
      null
    ),
    createData(
      5,
      "0e2e22e5-7732-46df-9d1c-d7c1b905b960",
      "test1",
      "2021-05-19T20:10:06",
      null
    ),
    createData(
      6,
      "35cb71a4-e25f-4b3d-b696-42e2bbdc894d",
      "null",
      "not in use",
      null
    ),
    createData(
      7,
      "4b775f8-b15f-45c6-80af-ffa47f2028e4",
      "test0000",
      "2021-09-03T10:04:21",
      null
    ),
    createData(
      8,
      "c1b84a4f-cc56-4e65-bf16-0e781f3b7ad8",
      "null",
      "not in use",
      null
    ),
    createData(
      9,
      "6abbc3da-9ce1-4ced-b82e-320f6e4c7bc9",
      "test9991",
      "2021-09-03T16:34:34",
      null
    ),
    createData(
      10,
      "573d38e6-15b9-4471-971e-59bf78545380",
      "test2",
      "2021-09-14T17:27:18",
      null
    ),
    createData(
      11,
      "b6ff475f-5ab0-4a28-a714-fff5311eb1f4",
      "hobada96",
      "2021-09-14T17:25:54",
      null
    ),
    createData(
      12,
      "f04cb1b8-6fc3-44f3-b043-cefd4e12af29",
      "neurotx",
      "2022-01-24T15:59:14",
      null
    ),
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteAccount = (row) => {
    setRows(rows.filter((users) => users.Serial !== row.Serial));
    alert(row.Serial + "가 삭제 되었습니다");
  };

  const AddLicense = () => {
    const newValue = createData(
      13,
      "f04cb1b8-6fc3-44f3-b043-cefd4e12af29",
      "null",
      "not in use",
      null
    );
    setRows([...rows, newValue]);
    alert("새로운 라이센스 키가 등록되었습니다.");
  };

  function cell(value, row) {
    if (value == null) {
      return (
        <Button
          style={{
            color: "#CCCCCC",
            borderRadius: 10,
            backgroundColor: "#393939",
          }}
          onClick={() => handleDeleteAccount(row)}
        >
          Delete
        </Button>
      );
    } else {
      return value;
    }
  }

  React.useEffect(() => {}, []);

  return (
    <Paper
      style={{ height: "70vh", width: "100%", backgroundColor: "#131313" }}
    >
      <Button
        style={{
          color: "#CCCCCC",
          borderRadius: 10,
          backgroundColor: "#5e646b",
          marginLeft: 50,
          marginBottom: 10,
        }}
        onClick={AddLicense}
      >
        + Add Key
      </Button>
      <TableContainer
        style={{
          width: "95%",
          height: "58.7vh",
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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.Serial}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} style={{ color: "#c0c0c0" }}>
                          {cell(value, row)}
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
