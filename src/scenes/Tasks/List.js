import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import CreateTaskDialog from "../../components/Dialogs/CreateTaskDialog";

import DataTable from "./DataTable";


function Task(props) {
  const [selectedTask, selectTask] = useState(null);
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

  console.log('task list renderr');
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

export default Task;
