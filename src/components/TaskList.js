/*
 * Displays a list of tasks and handles fetching from GitHub API
 * Contains internal state and ability to delete tasks
 */
import { Flex, Box, ButtonGroup, Text, IconButton } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
// import useSWR from 'swr'; // fetching from GitHub API
import { v4 as uuidv4 } from 'uuid'; // generates unique id's for each task

import { Task } from "./Task"
import { TaskModal } from "./TaskModal"
import { Check, X } from "react-feather";

export const TaskList = (props) => {
  // array containing names of tasks
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  // wrapper of fetch() parsed to JSON
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
    setCurrentTask(JSON.parse(localStorage.getItem("currentTask")) || null);
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem("currentTask",  JSON.stringify(currentTask));
  }, [currentTask]);

  const handleSubmit = (value) => {
    let uuid = uuidv4(); // creates unique id
    let task = {id: uuid, title: value.title, complete: false}
    if(value.repo) {
      fetcher(`https://api.github.com/repos/${value.repo}`)
        .then(repo => {
          task = {...task, repo: repo};
          setTasks(values => [...values, task]);
        });
    } else {
      // spread operator `...` to push new value to tasks array
      setTasks(values => [...values, task]);
    }
  }

  const handleComplete = (completedTask) => {
    // find index where the completed task is located
    let newTasks = [...tasks];
    const index = newTasks.findIndex((task) => task.id === completedTask.id);
    // adds `complete` flag to task
    let task = {...newTasks[index], complete: true};
    newTasks[index] = task;
    setTasks(newTasks);
    setCurrentTask(null);
  }

  const handleDelete = (deletedTask) => {
    // filters out tasks with matching id
    const newTasks = tasks.filter((task) => task.id !== deletedTask.id);
    setTasks(newTasks);
  }

  return (
    <Box {...props}>
      <TaskModal onSubmit={handleSubmit} mb={6}/>
      {currentTask ? <>
        {/* selected task */}
        <Text color="gray" textTransform="uppercase" mb={2}>Currently working on</Text>
        <Task
          task={currentTask}
          onDelete={() => {handleDelete(currentTask); setCurrentTask(null)}}
          mb={3}
          borderLeftWidth="8px"
          borderLeftColor="whatsapp.500"
        />
        <ButtonGroup mb={6} variant="outline">
          <IconButton icon={<Check />} onClick={() => {handleComplete(currentTask)}} colorScheme="green" borderColor="gray.200" boxShadow="base" />
          <IconButton icon={<X />} onClick={() => {setCurrentTask(null)}} colorScheme="red" borderColor="gray.200" boxShadow="base" />
        </ButtonGroup>
      </> :
      (tasks.length > 0 && <Text color="gray" textTransform="uppercase" mb={2}>Select a task</Text>)}
      <Flex direction="column">
        {/* uncompleted tasks */}
        {tasks.filter((task) => currentTask !== task && !task.complete).map((task) => // puts each task in its own Text component
          <Task
            task={task}
            onDelete={() => handleDelete(task)}
            onSelect={currentTask ? null : () => setCurrentTask(task)}
            _hover={currentTask ? {} : {borderLeftWidth: "8px"}}
          />
        )}
        {/* completed tasks */}
        {tasks.filter((task) => task.complete).map((task) =>
          <Task
            task={task}
            onDelete={() => handleDelete(task)}
            color="gray.500"
            textDecoration="line-through"
          />
        )}
      </Flex>
    </Box>
  )
}