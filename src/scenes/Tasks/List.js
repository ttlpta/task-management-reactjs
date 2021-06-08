import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import CreateTaskDialog from "../../components/Dialogs/CreateTaskDialog";

import { getTasks } from "../../redux/slices/taskSlice";
import DataTable from "./DataTable";


export default function Task(props) {
  const [selectedTask, selectTask] = useState(null);
  const dispatch = useDispatch();
  const [openAddDialog, toggleAddDialog] = useState(false);
  const handleClickEdit = (taskId) => {
    selectTask(taskId);
    toggleAddDialog(true);
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
      <DataTable 
        onEdit={handleClickEdit}
      />
      <CreateTaskDialog open={openAddDialog} handleClose={handleCloseCreateDialog} taskId={selectedTask}/>
    </Box>
  );
}
