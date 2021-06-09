/*
 * A dialog that prompts the user to create a new task, with fields for the description and GitHub repository
 */
import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';

import React, { useState } from 'react';

export const TaskModal = ({onSubmit}) => {
  // current value in form input
  const [value, setValue] = useState({
    title: "",
    repo: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    // clears form input
    setValue("");
    onClose();
  }
  const handleTitleChange = (e) => {
    e.persist();
    setValue((value) => ({
      ...value,
      title: e.target.value,
    }));
  };
  const handleRepoChange = (e) => {
    e.persist();
    setValue((value) => ({
      ...value,
      repo: e.target.value,
    }));
  };

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Add Task</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label>
              Task
              <Input name="title" placeholder="Description" value={value.title} onChange={handleTitleChange} autocomplete="off" mb={3}/>
            </label>
            <label>
              GitHub Repository
              <Input name="repo" placeholder="user/repo" value={value.repo} onChange={handleRepoChange} autocomplete="off" />
            </label>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}