import { Input, Flex, Button, Text, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { Trash } from "react-feather";

export const TaskList = (props) => {
  // array containing names of tasks
  const [tasks, setTasks] = useState([]);
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

  const handleDelete = (index) => {
    // filters out tasks with matching index
    const newTasks = tasks.filter((task, id) => id !== index);
    setTasks(newTasks);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Task" value={value} onChange={handleChange} {...props}/>
      </form>
      <Flex direction="column-reverse">
        {tasks.map((task, index) => // puts each task in its own Text component
          <Flex my={2} py={3} px={6} alignItems="center" boxShadow="base" textAlign="left" borderWidth="1px" borderRadius="lg">
            <Text key={index}>{task}</Text>
            <Spacer />
            {/* arrow function `=>` so handleDelete isn't called on render */}
            <Button onClick={() => handleDelete(index)} colorScheme="red" variant="ghost">
              <Trash size={18}/>
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  )
}