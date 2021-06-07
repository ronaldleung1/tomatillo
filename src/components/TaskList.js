import { Input, Flex, Box, Button, Text, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
// import useSWR from 'swr'; // fetching from GitHub API
import { Trash } from "react-feather";

export const TaskList = (props) => {
  // array containing names of tasks
  const [tasks, setTasks] = useState([]);
  // current value in form input
  const [value, setValue] = useState("");
  const [repo, setRepo] = useState(null);

  // wrapper of fetch() parsed to JSON
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  
  const handleChange = (e) => {
    setValue(e.target.value);
  } 

  const handleSubmit = (e) => {
    fetcher(`https://api.github.com/repos/${value}`)
      .then(repo => setRepo(repo))
      .then(repo => setTasks(values => [...values, repo]))
    // spread operator to push new value to tasks array
    
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
          <Flex key={index} my={2} py={3} px={6} alignItems="center" boxShadow="base" textAlign="left" borderWidth="1px" borderRadius="lg">
            <Box>
              <Text>{repo["full_name"]}</Text>
              <Text>{repo["description"]}</Text>
            </Box>
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