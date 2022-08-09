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
  InputAdornment,
} from "@mui/material";
import ExperimentSubPageChangeModalHeader from "../../molecules/ExperimentsSubPage/ExperimentSubPageChangeModalHeader";
import ExperimentSubPageChangeModalMiddle from "../../molecules/ExperimentsSubPage/ExperimentSubPageChangeModalMiddle";
import ExperimentSubPageModalHeader from "../../molecules/ExperimentsSubPage/ExperimentSubPageModalHeader";
import ExperimentSubPageModalMiddle from "../../molecules/ExperimentsSubPage/ExperimentSubPageModalMiddle";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";

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
  { id: "id", label: "ID", minWidth: 50 },
  { id: "sex", label: "성별", minWidth: 50 },
  {
    id: "age",
    label: "나이",
    minWidth: 50,
  },
  {
    id: "maindiagnosis",
    label: "주진단명",
    minWidth: 100,
  },
  {
    id: "machine",
    label: "자극기기",
    minWidth: 100,
  },
  {
    id: "time",
    label: "실험시간",
    minWidth: 200,
  },
  {
    id: "intensity",
    label: "최대 자극세기",
    minWidth: 100,
  },
  {
    id: "link",
    label: "설문조사",
    minWidth: 50,
  },
  {
    id: "agreement",
    label: "동의서",
    minWidth: 50,
  },
  {
    id: "button",
    label: "-",
    minWidth: 200,
  },
];

export default function ExperimentSubPageMiddle(props) {
  const Experimentsid = props.id;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([
    createData(
      "형정우",
      "남성",
      "19960101",
      undefined,
      null,
      ["2022-04-19 06:41:20", "00:00"],
      200,
      "https://github.com/jinchaeyeon/se-manager/tree/main/src/components",
      undefined,
      "button"
    ),
    createData(
      "김동영",
      "남성",
      "19970202",
      undefined,
      null,
      ["2022-04-20 04:20:02", "00:00"],
      null,
      "https://github.com/jinchaeyeon/se-manager/tree/main/src/components",
      undefined,
      "button"
    ),
    createData(
      "허재욱",
      "남성",
      "19950303",
      undefined,
      null,
      ["2022-04-20 08:19:03", "00:00"],
      200,
      "https://github.com/jinchaeyeon/se-manager/tree/main/src/components",
      undefined,
      "button"
    ),
    createData(
      "박준수",
      "남성",
      "19970404",
      undefined,
      null,
      ["2022-04-20 11:20:45", "65:22"],
      null,
      "https://github.com/jinchaeyeon/se-manager/tree/main/src/components",
      undefined,
      "button"
    ),
    createData(
      "조동혁",
      "남성",
      "19980505",
      undefined,
      null,
      ["2022-04-21 02:12:23", "73:57"],
      null,
      "https://github.com/jinchaeyeon/se-manager/tree/main/src/components",
      undefined,
      "button"
    ),
    createData(
      "정민경",
      "남성",
      "19960606",
      undefined,
      null,
      ["2022-04-21 05:18:06", "64:34"],
      200,
      "https://github.com/jinchaeyeon/se-manager/tree/main/src/components",
      undefined,
      "button"
    ),
    createData(
      "이철희",
      "남성",
      "19930707",
      undefined,
      null,
      ["2022-04-21 07:53:14", "00:00"],
      null,
      "https://github.com/jinchaeyeon/se-manager/tree/main/src/components",
      undefined,
      "button"
    ),
    createData(
      "김진형",
      "남성",
      "19900808",
      undefined,
      null,
      ["2022-04-21 11:16:19", "59:32"],
      200,
      "https://github.com/jinchaeyeon/se-manager/tree/main/src/components",
      undefined,
      "button"
    ),
    createData(
      "김현지",
      "여성",
      "19940909",
      undefined,
      null,
      ["2022-04-22 02:10:33", "00:00"],
      200,
      "https://github.com/jinchaeyeon/se-manager/tree/main/src/components",
      undefined,
      "button"
    ),
    createData(
      "이세호",
      "남성",
      "19901010",
      undefined,
      null,
      ["2022-04-22 05:01:04", "78:26"],
      null,
      "https://github.com/jinchaeyeon/se-manager/tree/main/src/components",
      undefined,
      "button"
    ),
    createData(
      "김고은",
      "여성",
      "19981111",
      undefined,
      null,
      ["2022-04-22 08:04:59", "76:58"],
      null,
      "https://github.com/jinchaeyeon/se-manager/tree/main/src/components",
      undefined,
      "button"
    ),
  ]);
  const [open, setOpen] = React.useState(false);
  const [openProtocol, setOpenProtocol] = React.useState(false);
  const [state, setState] = React.useState([]);

  function createData(
    id,
    sex,
    ages,
    maindiagnosis,
    machine,
    time,
    intensity,
    link,
    agreement,
    button
  ) {
    const today = new Date();
    const birthDate = new Date(
      parseInt(ages.slice(0, 4)),
      parseInt(ages.slice(4, 6)),
      parseInt(ages.slice(6, 8))
    );
    let age = today.getFullYear() - birthDate.getFullYear() + 1;

    return {
      id,
      sex,
      age,
      maindiagnosis,
      machine,
      time,
      intensity,
      link,
      agreement,
      button,
      ages,
    };
  }

  const handleOpen = (row) => {
    setOpen(true);
    setState(row);
  };
  const handleClose = () => setOpen(false);

  const handleOpenProtocol = (row) => {
    setOpenProtocol(true);
    setState(row);
  };
  const handleProtocolClose = () => setOpenProtocol(false);

  const handleProtocol = (
    id,
    name,
    sex,
    birthday,
    maindiagnosis,
    link,
    file
  ) => {
    const today = new Date();
    const birthDate = new Date(
      parseInt(birthday.slice(0, 4)),
      parseInt(birthday.slice(4, 6)),
      parseInt(birthday.slice(6, 8))
    );
    let age = today.getFullYear() - birthDate.getFullYear() + 1;
    setRows(
      rows.map((users) =>
        users.id === id
          ? {
              ...users,
              id: name,
              sex: sex,
              age: age,
              ages: birthday,
              maindiagnosis: maindiagnosis,
              link: link,
              agreement: file[0],
            }
          : users
      )
    );
    alert("정보가 변경되었습니다.");
    handleClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAddProtocol = (
    name,
    sex,
    birthday,
    maindiagnosis,
    link,
    file
  ) => {
    let today = new Date();

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜

    let hours = today.getHours(); // 시
    let minutes = today.getMinutes(); // 분
    let seconds = today.getSeconds(); // 초
    if (month.toString().length != 2) {
      month = "0" + month;
    }
    if (date.toString().length != 2) {
      date = "0" + date;
    }
    if (hours.toString().length != 2) {
      hours = "0" + hours;
    }
    if (minutes.toString().length != 2) {
      minutes = "0" + minutes;
    }
    if (seconds.toString().length != 2) {
      seconds = "0" + seconds;
    }
    const start =
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    setRows([
      ...rows,
      createData(
        name,
        sex,
        birthday,
        maindiagnosis,
        null,
        [start, "00:00"],
        null,
        link,
        file,
        "button"
      ),
    ]);
    alert("피험자가 추가되었습니다.");
    handleProtocolClose();
    window.location.href = `../ExperimentsSub/${Experimentsid}/${name}`;
  };

  const handleDeleteAccount = (row) => {
    setRows(rows.filter((users) => users.id !== row.id));
    alert("ID " + row.id + "가 삭제 되었습니다");
  };

  function cell(value, row) {
    if (value == "button") {
      return (
        <Box>
          <Link to={`../ExperimentsResult/${Experimentsid}/${row.id}`}>
            <Button
              style={{
                color: "white",
                borderRadius: 10,
                backgroundColor: "#2877b9",
                marginRight: 5,
                fontFamily: 'GmarketSansMedium'
              }}
            >
              실험정보
            </Button>
          </Link>
          <Button
            style={{
              color: "#CCCCCC",
              borderRadius: 10,
              backgroundColor: "#5e646b",
              marginRight: 5,
              fontFamily: 'GmarketSansMedium'
            }}
            onClick={() => handleOpen(row)}
          >
            수정
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            BackdropProps={{ style: { opacity: 0.2 } }}
          >
            <Box sx={style}>
              <ExperimentSubPageChangeModalHeader propFunction={handleClose} />
              <ExperimentSubPageChangeModalMiddle
                data={state}
                propFunction={handleProtocol}
              />
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
            삭제
          </Button>
        </Box>
      );
    } else if (Array.isArray(value) == true) {
      return (
        <Box>
          <h6>시작시간:{value[0]}</h6>
          <h6>소요시간:{value[1]}</h6>
        </Box>
      );
    } else if (value == null) {
      return "null";
    } else if (value == "") {
      return "null";
    } else if (
      typeof value == "string" &&
      value[0] == "h" &&
      value[1] == "t" &&
      value[2] == "t" &&
      value[3] == "p"
    ) {
      return <a href={value}>link</a>;
    } else if (typeof value == "object") {
      return (
        <a href={value.name} download>
          <LinkIcon>다운로드</LinkIcon>
        </a>
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
          color: "white",
          borderRadius: 10,
          backgroundColor: "#2877b9",
          marginRight: 40,
          marginBottom: 10,
          float: "right",
          fontFamily: 'GmarketSansMedium'
        }}
        onClick={() => handleOpenProtocol()}
      >
        실험시작
      </Button>
      <Modal
        open={openProtocol}
        onClose={handleProtocolClose}
        BackdropProps={{ style: { opacity: 0.2 } }}
      >
        <Box sx={style}>
          <ExperimentSubPageModalHeader propFunction={handleProtocolClose} />
          <ExperimentSubPageModalMiddle propFunction={handleAddProtocol} />
        </Box>
      </Modal>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
