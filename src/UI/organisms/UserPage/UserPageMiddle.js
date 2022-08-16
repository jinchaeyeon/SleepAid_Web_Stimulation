import * as React from "react";
import {
  Button,
  Box,
  Modal,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";
import UserPageModalHeader from "../../molecules/UserPage/UserPageModalHeader";
import UserPageModalMiddle from "../../molecules/UserPage/UserPageModalMiddle";
import Api from '../../../API/API';

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

export default function UserPageMiddle() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([
    createData("test", "test1@gmail.com", undefined, undefined, false),
    createData("james", "rwandahm@gmail.com", undefined, undefined, true),
    createData("test0", "las@gmail.com", undefined, undefined, true),
    createData("test00", "test00@gmail.com", undefined, undefined, true),
    createData(
      "test00011",
      "rwandahm11@gmaisd.com",
      undefined,
      undefined,
      true
    ),
    createData("test1", "rwand2222@gmail.com", undefined, undefined, false),
    createData("hobada96", "hobada97@naver.com", undefined, undefined, false),
    createData("test2", "2341@wdkodw.coo.or2", undefined, undefined, false),
    createData("test01394", "kdow.kakao.kr", undefined, undefined, false),
    createData("test03", "lwpe.dow.rrr", undefined, undefined, false),
    createData("test0013", "rerwer@rlpe.com", undefined, undefined, true),
    createData("hobada99", "hobada96@neurotx.org", undefined, undefined, true),
    createData("hobadamm", "hobada98@neurotx.org", undefined, undefined, true),
  ]);
  const [openTrue, setOpenTrue] = React.useState(false);
  const [openFalse, setOpenFalse] = React.useState(false);
  const [state, setState] = React.useState([]);

  const handleOpenTrue = (row) => {
    setOpenTrue(true);
    setState(row);
  };
  const handleCloseTrue = () => setOpenTrue(false);
  const handleEmail = (data, text) => {
    setRows(
      rows.map((users) =>
        users.UserID === data.Email.UserID ? { ...users, Email: text } : users
      )
    );
    alert("Email이 변경되었습니다.");
    handleCloseTrue();
    handleCloseFalse();
  };

  const handleOpenFalse = (row) => {
    setOpenFalse(true);
    setState(row);
  };
  const handleCloseFalse = () => setOpenFalse(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAccount = (row) => {
    setRows(
      rows.map((users) =>
        users.UserID === row.UserID
          ? { ...users, button: !users.button }
          : users
      )
    );
  };

  const handleDeleteAccount = (row) => {
    setRows(rows.filter((users) => users.UserID !== row.UserID));
    alert(row.UserID + "가 삭제 되었습니다");
  };

  function cell(value, row) {
    if (value == true) {
      return (
        <Box>
          <Button
            style={{
              color: "white",
              borderRadius: 10,
              backgroundColor: "#2877b9",
              marginRight: 5,
              fontFamily: 'GmarketSansMedium'
            }}
            onClick={() => handleAccount(row)}
          >
            make ADMIN
          </Button>
          <Button
            style={{
              color: "#CCCCCC",
              borderRadius: 10,
              backgroundColor: "#5e646b",
              marginRight: 5,
              fontFamily: 'GmarketSansMedium'
            }}
            onClick={() => handleOpenTrue(row)}
          >
            modify
          </Button>
          <Modal
            open={openTrue}
            onClose={handleCloseTrue}
            BackdropProps={{ style: { opacity: 0.2 } }}
          >
            <Box sx={style}>
              <UserPageModalHeader propFunction={handleCloseTrue} />
              <UserPageModalMiddle Email={state} propFunction={handleEmail} />
            </Box>
          </Modal>
          <Button
            style={{
              color: "#CCCCCC",
              borderRadius: 10,
              backgroundColor: "#393939",
              fontFamily: 'GmarketSansMedium'
            }}
            onClick={() => handleDeleteAccount(row)}
          >
            Delete
          </Button>
        </Box>
      );
    } else if (value == false) {
      return (
        <Box>
          <Button
            style={{
              color: "#CCCCCC",
              borderRadius: 10,
              backgroundColor: "#5e646b",
              marginRight: 5,
              fontFamily: 'GmarketSansMedium'
            }}
            onClick={() => handleAccount(row)}
          >
            make User
          </Button>
          <Button
            style={{
              color: "#CCCCCC",
              borderRadius: 10,
              backgroundColor: "#5e646b",
              fontFamily: 'GmarketSansMedium'
            }}
            onClick={() => handleOpenFalse(row)}
          >
            modify
          </Button>
          <Modal
            open={openFalse}
            onClose={handleCloseFalse}
            BackdropProps={{ style: { opacity: 0.2 } }}
          >
            <Box sx={style}>
              <UserPageModalHeader propFunction={handleCloseFalse} />
              <UserPageModalMiddle Email={state} propFunction={handleEmail} />
            </Box>
          </Modal>
        </Box>
      );
    } else {
      return value;
    }
  }

  React.useEffect(() => {
    const obj = {
      search : undefined,
      searchParameter: undefined,
      orderParameter: 'dateTime',
      order: 'DESC',
      pageNumber: 1,
      count: 10,
    }
    const getData = async () => {
      const infoBody = await Api.getUserData(obj);
      console.log(infoBody)
    }
    getData();
  }, []);

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
                  style={{ minWidth: column.minWidth, color: "white",fontFamily: 'GmarketSansMedium' }}
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
                    key={row.UserID}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} style={{ color: "#c0c0c0",fontFamily: 'GmarketSansMedium' }}>
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
