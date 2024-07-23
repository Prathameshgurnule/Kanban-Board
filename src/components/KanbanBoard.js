import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateTaskStatus, setSearchQuery } from '../store/tasksSlice';
import { TextField, Button } from '@mui/material';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const searchQuery = useSelector(state => state.tasks.searchQuery);
  const [open, setOpen] = useState(false);  // Add state for the modal

  const columns = ['To Do', 'In Progress', 'Peer Review', 'Done'];

  const handleDragEnd = result => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      dispatch(updateTaskStatus({ id: result.draggableId, status: destination.droppableId }));
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <TextField
        variant="outlined"
        label="Search Tasks"
        fullWidth
        margin="normal"
        onChange={e => dispatch(setSearchQuery(e.target.value))}
      />
      <Button variant="contained" color="primary" style={{ marginBottom: '20px' }} onClick={() => setOpen(true)}>
        Add Task
      </Button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {columns.map(column => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    margin: '0 10px',
                    padding: '10px',
                    borderRadius: '4px',
                    background: '#f4f4f4',
                    flex: '1',
                  }}
                >
                  <h2>{column}</h2>
                  {filteredTasks.filter(task => task.status === column).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <AddTaskModal open={open} setOpen={setOpen} />  {/* Pass open and setOpen as props */}
    </div>
  );
};

export default KanbanBoard;