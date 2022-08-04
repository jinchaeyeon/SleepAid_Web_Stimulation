import React from 'react';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
export const SidebarData = [
  {
    title: 'Experiments',
    path: '/',
    icon: <InsertChartOutlinedIcon />,
    iconClosed: <KeyboardArrowDownOutlinedIcon />,
    iconOpened: <KeyboardArrowUpOutlinedIcon />,
    subNav: [
      {
        title: 'List',
        path: '/',
      },
    ]
  },
  {
    title: 'Member(ADMIN)',
    path: '/',
    icon: <PeopleOutlineIcon />,
    iconClosed: <KeyboardArrowDownOutlinedIcon />,
    iconOpened: <KeyboardArrowUpOutlinedIcon />,
    subNav: [
      {
        title: 'Users',
        path: '/',
      },
    ]
  },
  {
    title: 'License(ADMIN)',
    path: '/',
    icon: <PinOutlinedIcon />,
    iconClosed: <KeyboardArrowDownOutlinedIcon/>,
    iconOpened: <KeyboardArrowUpOutlinedIcon />,
    subNav: [
      {
        title: 'List',
        path: '/',

      },
    ]
  },
  {
    title: 'WebGL Chart(test)',
    path: '/',
    icon: <InsertChartOutlinedIcon />,
    iconClosed: <KeyboardArrowDownOutlinedIcon />,
    iconOpened: <KeyboardArrowUpOutlinedIcon />,
    subNav: [
      {
        title: 'Chart A(bin)',
        path: '/',

      },
      {
        title: 'Chart B(JSON)',
        path: '/',

      },
    ]
  },
];
