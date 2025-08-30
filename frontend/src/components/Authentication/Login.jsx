import React from 'react';
import { Field, Input,Box } from "@chakra-ui/react"
import { useState } from 'react';
import { Button, HStack} from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const Login = () => {

  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const {data} = await axios.post("http:/https://chat-application-g7r8-d2ugardhl-manish-rajs-projects-f5ae813e.vercel.app/api/user/login", {
        email,
        password,
      });

      // console.log("Login Success:", response.data);
       localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chats")
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      alert("Login failed. Please check credentials.");
    }
  };

  

  return (
    <Box>
      <Field.Root required mb={3}>
      <Field.Label>Email</Field.Label>
      <Input value={email} placeholder="me@example.com"onChange={(e)=>setEmail(e.target.value)} />
    </Field.Root>

    <Field.Root required mb={5} >
      <Field.Label>Password</Field.Label>
      <Input value={password} placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
    </Field.Root>

   


     <HStack width="100%" mb={2}>
      <Button colorPalette="teal" w="100%" variant="solid" onClick={handleLogin} >
         Login
      </Button>
    </HStack>

     <HStack border="1px" colorPalette="teal" width="100%" >
       <Button colorPalette="teal" w="100%" variant="outline" onClick={()=>{
        setEmail("guest@gmail.com");
        setPassword("123456");
       }} >
        Get Guest User Credential
      </Button>
    </HStack>
    
    </Box>
  );
}

export default Login;
