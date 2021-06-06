import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { getTasks, selectAllTasks } from "../../redux/slices/taskSlice";


export default function Task(props) {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const columnData = [
    { code: 'id', label: 'ID' },
    { code: 'name', label: 'Name' },
    { code: 'description', label: 'Description' },
    { code: 'status', label: 'Status' },
    { code: 'categoryId', label: 'Category' },
    { code: 'ownerId', label: 'Owner' },
    { code: 'deadline', label: 'Deadline' },
    { code: 'createdAt', label: 'Create At' },
    { code: 'updateAt', label: 'Update At' },
    { code: 'action', label: 'Action' },
  ];

  const renderData = (data, name) => {
    if(name === 'action') {
      return <Box>
        <IconButton aria-label="delete">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    }
    return data[name] || 'N/A';
  } 
  useEffect(() => {
    dispatch(getTasks());
  }, []);

  
  return (
    <Box height="100%">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {
                columnData.map((column, key) => {
                  return (<TableCell key={`column-${column.code}`}>{column.label}</TableCell>)
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row) => (
              <TableRow key={row.name + row.id}>
                {
                  columnData.map((column, key) => {
                    return (<TableCell key={`columnItem-${column.code}`}>{renderData(row, column.code)}</TableCell>)
                  })
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
