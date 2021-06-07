import React, { useEffect, useState } from "react";
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
import Button from '@material-ui/core/Button';
import CreateTaskDialog from "../../components/Dialogs/CreateTaskDialog";

import { getTasks, selectAllTasks } from "../../redux/slices/taskSlice";


export default function Task(props) {
  const [selectedTask, selectTask] = useState(null);
  const dispatch = useDispatch();
  const [openAddDialog, toggleAddDialog] = useState(false);
  const tasks = useSelector(selectAllTasks);
  // const task = useSelector(state => selectTaskById(state, 21));
  
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

  const handleClickEdit = (task) => {
    selectTask(task.id);
    toggleAddDialog(true);
  } 

  const renderData = (data, name) => {
    if(name === 'action') {
      return <Box>
        <IconButton aria-label="edit">
          <EditIcon fontSize="small" onClick={() => handleClickEdit(data)}/>
        </IconButton>
        <IconButton aria-label="delete" >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    }
    return data[name] || 'N/A';
  } 

  const handleOpenCreateDialog = () => {
    toggleAddDialog(true);
  }

  const handleCloseCreateDialog = () => {
    toggleAddDialog(false);
    setTimeout(() => {
      selectTask(null);
    }, 100);
  }

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <Box height="100%">
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={handleOpenCreateDialog}>
          Create Task
        </Button>
      </Box>
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
      <CreateTaskDialog open={openAddDialog} handleClose={handleCloseCreateDialog} taskId={selectedTask}/>
    </Box>
  );
}
