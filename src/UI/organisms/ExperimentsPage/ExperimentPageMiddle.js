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
  TextField,
  InputAdornment 
} from "@mui/material";
import ExperimentPageModalHeader from "../../molecules/ExperimentsPage/ExperimentPageModalHeader";
import ExperimentPageModalMiddle from "../../molecules/ExperimentsPage/ExperimentPageModalMiddle";
import SearchIcon from '@mui/icons-material/Search';

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
  { id: "id", label: "번호", minWidth: 100 },
  { id: "name", label: "실험 프로토콜 명", minWidth: 200 },
  {
    id: "content",
    label: "상세설명",
    minWidth: 300,
  },
  {
    id: "manager",
    label: "담당자",
    minWidth: 100,
  },
  {
    id: "button",
    label: "-",
    minWidth: 200,
  },
];

function createData(id, name, content, manager, button) {
  return { id, name, content, manager, button };
}

export default function ExperimentPageMiddle() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([
    createData(1, "vns", null, "송하윤", 0),
    createData(2, "innea vns", null, "송하윤", 0),
    createData(3, "vns", null, "한태성", 0),
    createData(4, "innea vns", null, "한태성", 0),
    createData(5, "test2", "인증", "허재욱ㅠㅠ", 0),
    createData(6, "ecg patch", "ecg 패치 테스트", "조동혁", 0),
    createData(7, "김성철", null, "김현지", 0),
    createData(8, "조정훈", null, "송하윤", 0),
    createData(9, "ECG PATCH EXP", null, "조동혁", 0),
    createData(10, "박산하", null, "한태성", 0),
    createData(11, "teasdfa", null, "한태성", 0),
    createData(12, "teasdfasaaaaaaaa", null, "한태성", 0),
  ]);
  const [openTrue, setOpenTrue] = React.useState(false);
  const [openFalse, setOpenFalse] = React.useState(false);
  const [state, setState] = React.useState([]);
  const [Search, setSearch] = React.useState('');
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleOpenTrue = (row) => {
    setOpenTrue(true);
    setState(row);
  };
  const handleCloseTrue = () => setOpenTrue(false);
  const handleEmail = (data, text) => {
    if (text != null) {
      setRows(
        rows.map((users) =>
          users.UserID === data.Email.UserID ? { ...users, Email: text } : users
        )
      );
      alert("Email이 변경되었습니다.");
    }
    handleCloseTrue();
    handleCloseFalse();
  };

  const SearchProtocol = () => {
    console.log("연동해야해")
  }
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
    setRows(rows.filter((users) => users.id !== row.id));
    alert(row.id + "번이 삭제 되었습니다");
  };

  function cell(value, row) {
    if (value == 0) {
      return (
        <Box>
          <Button
            style={{
              color: "white",
              borderRadius: 10,
              backgroundColor: "#2877b9",
              marginRight: 5,
            }}
            onClick={() => handleAccount(row)}
          >
            실험관리
          </Button>
          <Button
            style={{
              color: "#CCCCCC",
              borderRadius: 10,
              backgroundColor: "#5e646b",
              marginRight: 5,
            }}
            onClick={() => handleOpenTrue(row)}
          >
            수정
          </Button>
          <Modal
            open={openTrue}
            onClose={handleCloseTrue}
            BackdropProps={{ style: { opacity: 0.2 } }}
          >
            <Box sx={style}>
              <ExperimentPageModalHeader propFunction={handleCloseTrue} />
              <ExperimentPageModalMiddle
                Email={state}
                propFunction={handleEmail}
              />
            </Box>
          </Modal>
          <Button
            style={{
              color: "#CCCCCC",
              borderRadius: 10,
              backgroundColor: "#393939",
            }}
            onClick={() => handleDeleteAccount(row)}
          >
            삭제
          </Button>
        </Box>
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
      <TextField
        value={Search}
        onChange={handleSearchChange}
        placeholder="실험명으로 검색"
        size="small"
        style={{backgroundColor: "white", marginLeft: 50}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start" >
              <SearchIcon style={{color : "#2877b9"}} onClick={SearchProtocol}/>
            </InputAdornment>
          ),
        }}
      />
      <Button
        style={{
          color: "white",
          borderRadius: 10,
          backgroundColor: "#2877b9",
          marginRight: 40,
          marginBottom: 10,
          float: "right"
        }}
      >
        프로토콜 추가
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
