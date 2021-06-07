import { Input } from '@chakra-ui/input';

import React, { useState } from 'react';

export const TaskModal = ({onSubmit}) => {
  // current value in form input
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    // clears form input
    setValue("");
  }
  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input placeholder="Task" value={value} onChange={handleChange}/>
    </form>
  )
}