import React from 'react';
import { Field, Input,Box } from "@chakra-ui/react"
import { useState } from 'react';
import { Button, HStack } from "@chakra-ui/react"
import { RiArrowRightLine, RiMailLine } from "react-icons/ri"
import {  FileUpload } from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"
import axios from "axios"
import { useHistory } from 'react-router-dom';


const Signup = () => {

  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();

const handleSignup = async () => {
    if (!name || !email || !password || !confirmpassword) {
      alert("Please fill in all the fields");
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:400/api/user", {
        name,
        email,
        password,
        confirmpassword
      });

      localStorage.setItem("token", response.data.token);
      // alert("Signup successful!");
      
      // console.log("User created:", response.data);
      history.push("/chats");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <Box>
      <Field.Root required mb={3}>
      <Field.Label>Name</Field.Label>
      <Input placeholder="Enter your Name" onChange={(e)=>setName(e.target.value)} />
    </Field.Root>

    <Field.Root required mb={3}>
      <Field.Label>Email</Field.Label>
      <Input placeholder="me@example.com" onChange={(e)=>setEmail(e.target.value)} />
    </Field.Root>

     <Field.Root required mb={3}>
      <Field.Label>password</Field.Label>
      <Input placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
    </Field.Root>

     <Field.Root required mb={3}>
      <Field.Label>Confirm Password</Field.Label>
      <Input placeholder="Confirm Password" onChange={(e)=>setConfirmpassword(e.target.value)} />
    </Field.Root>

         {/* <FileUpload.Root mb={5} >
      <FileUpload.HiddenInput />
      <FileUpload.Label>Upload image</FileUpload.Label>
      <Input asChild>
        <FileUpload.Trigger>
          <FileUpload.FileText />
        </FileUpload.Trigger>
      </Input>
    </FileUpload.Root> */}

     <HStack width="100%">
      <Button colorPalette="teal" w="100%" variant="solid" onClick={handleSignup} >
         Signup
      </Button>
    </HStack>

    
    </Box>
  );
}

export default Signup;
