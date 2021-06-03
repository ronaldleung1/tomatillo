import { Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';

export const TaskList = (props) => {
  const [tasks, setTasks] = useState([
    "Task 1",
    "Task 2",
    "Task 3",
  ]);

  const handleSubmit = (e) => {
    setTasks([e.target.value]);
  }

  return (
    <>
      <Input onSubmit={handleSubmit} placeholder="Task" {...props}/>
      {tasks.map((task) =>
        <Text>{task}</Text>
      )}
    </>
  )
}