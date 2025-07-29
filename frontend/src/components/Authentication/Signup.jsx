import React from 'react';
import { Field, Input,Box } from "@chakra-ui/react"
import { useState } from 'react';
import { Button, HStack } from "@chakra-ui/react"
import { RiArrowRightLine, RiMailLine } from "react-icons/ri"
import {  FileUpload } from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"

const Signup = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();


  return (
    <Box>
      <Field.Root required mb={3}>
      <Field.Label>Name</Field.Label>
      <Input placeholder="Enter your Name" onChange={(e)=>setName(e.target.value)} />
    </Field.Root>

    <Field.Root required mb={3}>
      <Field.Label>Email</Field.Label>
      <Input placeholder="me@example.com" onChange={(e)=>setName(e.target.value)} />
    </Field.Root>

     <Field.Root required mb={3}>
      <Field.Label>password</Field.Label>
      <Input placeholder="Enter Password" onChange={(e)=>setName(e.target.value)} />
    </Field.Root>

     <Field.Root required mb={3}>
      <Field.Label>Confirm Password</Field.Label>
      <Input placeholder="Confirm Password" onChange={(e)=>setName(e.target.value)} />
    </Field.Root>

        <FileUpload.Root required mb={5}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>

     <HStack width="100%">
      <Button colorPalette="teal" w="100%" variant="solid">
         Signup
      </Button>
    </HStack>

    
    </Box>
  );
}

export default Signup;
