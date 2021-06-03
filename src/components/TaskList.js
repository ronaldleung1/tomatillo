import { Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';

export const TaskList = (isActive, props) => {
  const [tasks, setTasks] = useState([
    "Task 1",
    "Task 2",
    "Task 3",
  ]);
  return (
    <>
      <Input placeholder="Task" {...props} />
      {tasks.map((task) =>
        <Text>{task}</Text>
      )}
    </>
  )
}