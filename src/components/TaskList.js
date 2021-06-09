/*
 * Displays a list of tasks and handles fetching from GitHub API
 * Contains internal state and ability to delete tasks
 */
import { Flex, Box, Button, Text, Link, Spacer } from "@chakra-ui/react";
import React, { useState } from 'react';
// import useSWR from 'swr'; // fetching from GitHub API

import { TaskModal } from "./TaskModal"
import { Trash } from "react-feather";

export const TaskList = (props) => {
  // array containing names of tasks
  const [tasks, setTasks] = useState([]);

  // wrapper of fetch() parsed to JSON
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  

  const handleSubmit = (value) => {
    if(value.repo) {
      fetcher(`https://api.github.com/repos/${value.repo}`)
        .then(repo => setTasks(values => [...values, {title: value.title, repo: repo}]))
    } else {
      // spread operator `...` to push new value to tasks array
      setTasks(values => [...values, {title: value.title}]);
    }
  }

  const handleDelete = (index) => {
    // filters out tasks with matching index
    const newTasks = tasks.filter((task, id) => id !== index);
    setTasks(newTasks);
  }

  return (
    <Box {...props}>
      <TaskModal onSubmit={handleSubmit} />
      <Flex direction="column-reverse">
        {tasks.map((task, index) => // puts each task in its own Text component
          <Flex key={index} my={2} p={4} alignItems="center" boxShadow="base" textAlign="left" borderWidth="1px" borderRadius="lg">
            <Box>
              <Text fontSize="lg" mb={task.repo && 2}>{task.title}</Text>
              {task.repo &&
              <Link href={task.repo["html_url"]} isExternal>
                <Box p={3} borderWidth="1px" borderRadius="lg">
                  <Text fontWeight="bold">{task.repo["full_name"]}</Text>
                  <Text color="gray.500">{task.repo["description"]}</Text>
                </Box>
              </Link>}
            </Box>
            <Spacer />
            {/* arrow function `=>` so handleDelete isn't called on render */}
            <Button onClick={() => handleDelete(index)} ml={2} colorScheme="red" variant="ghost">
              <Trash size={18}/>
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}