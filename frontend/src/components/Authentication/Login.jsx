import React from 'react';
import { Field, Input,Box } from "@chakra-ui/react"
import { useState } from 'react';
import { Button, HStack } from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"

const Login = () => {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();



  return (
    <Box>
      <Field.Root required mb={3}>
      <Field.Label>Email</Field.Label>
      <Input placeholder="me@example.com"onChange={(e)=>setEmail(e.target.value)} />
    </Field.Root>

    <Field.Root required mb={5} >
      <Field.Label>Password</Field.Label>
      <Input placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
    </Field.Root>

   


     <HStack width="100%" mb={2}>
      <Button colorPalette="teal" w="100%" variant="solid">
         Signup
      </Button>
    </HStack>

     <HStack border="1px" colorPalette="teal" width="100%" >
       <Button colorPalette="teal" w="100%" variant="outline">
        Get Guest User Credential
      </Button>
    </HStack>
    
    </Box>
  );
}

export default Login;
