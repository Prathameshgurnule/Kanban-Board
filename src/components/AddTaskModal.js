import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Box, TextField, Button } from '@mui/material';
import { addTask } from '../store/tasksSlice';

const AddTaskModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    dispatch(addTask({ title, description }));
    setOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Task
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add New Task</h2>
          <TextField
            label="Task Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            label="Task Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTaskModal;