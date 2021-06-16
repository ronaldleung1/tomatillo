/*
 * Displays a list of tasks and handles fetching from GitHub API
 * Contains internal state and ability to delete tasks
 */
import { Flex, Box, Button, ButtonGroup, Text, Link, Spacer, IconButton } from "@chakra-ui/react";
import React, { useState } from 'react';
// import useSWR from 'swr'; // fetching from GitHub API
import { v4 as uuidv4 } from 'uuid'; // generates unique id's for each task

import { Task } from "./Task"
import { TaskModal } from "./TaskModal"
import { Check, Trash, X } from "react-feather";

export const TaskList = (props) => {
  // array containing names of tasks
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  // wrapper of fetch() parsed to JSON
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  

  const handleSubmit = (value) => {
    let task;
    let uuid = uuidv4(); // creates unique id
    if(value.repo) {
      fetcher(`https://api.github.com/repos/${value.repo}`)
        .then(repo => {
          task = {id: uuid, title: value.title, repo: repo};
          setTasks(values => [...values, task]);
        });
    } else {
      task = {id: uuid, title: value.title};
      // spread operator `...` to push new value to tasks array
      setTasks(values => [...values, task]);
    }
  }

  const handleComplete = (completedTask) => {
    // filters out task with matching id with completedTask
    const newTasks = tasks.filter((task) => task.id !== completedTask.id);
    setTasks(newTasks);
    // adds to array of completed tasks
    setCompletedTasks(tasks => [...tasks, completedTask]);
    setCurrentTask(null);
  }

  const handleDelete = (deletedTask, taskList) => {
    // filters out tasks with matching id
    const newTasks = taskList.filter((task) => task.id !== deletedTask.id);
    setTasks(newTasks);
  }

  return (
    <Box {...props}>
      <TaskModal onSubmit={handleSubmit} mb={6}/>
      {currentTask ? <>
        {/* selected task */}
        <Text color="gray" textTransform="uppercase" mb={2}>Currently working on</Text>
        <Flex mb={3} p={4} alignItems="center" boxShadow="base" borderWidth="1px" borderRadius="lg" borderLeftWidth="8px" borderLeftColor="whatsapp.500" textAlign="left">
          <Box>
            <Text fontSize="lg" mb={currentTask.repo && 2}>{currentTask.title}</Text>
            {currentTask.repo &&
            <Link href={currentTask.repo["html_url"]} isExternal>
              <Box p={3} borderWidth="1px" borderRadius="lg">
                <Text fontWeight="bold">{currentTask.repo["full_name"]}</Text>
                <Text color="gray.500">{currentTask.repo["description"]}</Text>
              </Box>
            </Link>}
          </Box>
          <Spacer />
          <Button onClick={() => {handleDelete(currentTask, tasks); setCurrentTask(null)}} ml={2} colorScheme="red" variant="ghost">
            <Trash size={18}/>
          </Button>
        </Flex>
        <ButtonGroup mb={6} variant="outline">
          <IconButton icon={<Check />} onClick={() => {handleComplete(currentTask)}} colorScheme="green" borderColor="gray.200" boxShadow="base" />
          <IconButton icon={<X />} onClick={() => {setCurrentTask(null)}} colorScheme="red" borderColor="gray.200" boxShadow="base" />
        </ButtonGroup>
      </> :
      (tasks.length > 0 && <Text color="gray" textTransform="uppercase" mb={2}>Select a task</Text>)}
      <Flex direction="column">
        {/* uncompleted tasks */}
        {tasks.filter((task) => currentTask !== task).map((task) => // puts each task in its own Text component
          <Task
            task={task}
            _hover={currentTask ? {} : {borderLeftWidth: "8px"}}
            onClick={currentTask ? null : () => setCurrentTask(task)}
          />
          // <Flex 
          //   key={task.id}
          //   my={2}
          //   p={4}
          //   alignItems="center"
          //   boxShadow="base"
          //   textAlign="left"
          //   borderWidth="1px"
          //   borderRadius="lg"
          //   _hover={currentTask ? {} : {borderLeftWidth: "8px"}}
          //   onClick={currentTask ? null : () => setCurrentTask(task)}
          // >
          //   <Box>
          //     <Text fontSize="lg" mb={task.repo && 2}>{task.title}</Text>
          //     {task.repo &&
          //     <Link href={task.repo["html_url"]} isExternal>
          //       <Box p={3} borderWidth="1px" borderRadius="lg">
          //         <Text fontWeight="bold">{task.repo["full_name"]}</Text>
          //         <Text color="gray.500">{task.repo["description"]}</Text>
          //       </Box>
          //     </Link>}
          //   </Box>
          //   <Spacer />
          //   {/* arrow function `=>` so handleDelete isn't called on render */}
          //   <Button onClick={() => handleDelete(task, tasks)} ml={2} colorScheme="red" variant="ghost">
          //     <Trash size={18}/>
          //   </Button>
          // </Flex>
        )}
        {/* completed tasks */}
        {completedTasks.map((task) =>
          <Flex 
            key={task.id}
            my={2}
            p={4}
            alignItems="center"
            boxShadow="base"
            textAlign="left"
            color="gray.500"
            borderWidth="1px"
            borderRadius="lg"
          >
            <Box>
              <Text fontSize="lg" as="s" mb={task.repo && 2}>{task.title}</Text>
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
            <Button onClick={() => handleDelete(task, completedTasks)} ml={2} colorScheme="red" variant="ghost">
              <Trash size={18}/>
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}