import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TaskCard = ({ task }) => (
  <Card style={{ margin: '10px 0' }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {task.title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {task.description}
      </Typography>
    </CardContent>
  </Card>
);

export default TaskCard;