import { Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';

export const TaskList = (props) => {
  // array containing names of tasks
  const [tasks, setTasks] = useState([
    "Task 1",
    "Task 2",
    "Task 3",
  ]);
  // current value in form input
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  } 
  const handleSubmit = (e) => {
    // spread operator to push new value to tasks array
    setTasks(values => [...values, value]);
    // clears form input
    setValue("");
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Task" value={value} onChange={handleChange} {...props}/>
      </form>
      {tasks.map((task) => // puts each task in its own Text component
        <Text>{task}</Text>
      )}
    </>
  )
}