"use client"
import React from 'react';
import {Box, Container,Text, Code, Stack, Tabs, useTabs } from "@chakra-ui/react"


import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Homepage = () => {

  const tabs = useTabs({
    defaultValue: "members",
  })
  return (
    <Container maxW="md" centerContent>

      <Box 
        d="flex"
        justifyContent="center"
        textAlign="center"
        p={2}
        bg="black"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        >
        <Text fontSize="2xl" color="teal" fontFamily="revert">
          BuzzTalk
        </Text>
      </Box>

      <Box bg="black" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Stack align="center" w="100%" bg="black">
   
      <Tabs.RootProvider align="center" value={tabs} w="100%">
        <Tabs.List mb={4}  justifyContent="center">
          <Tabs.Trigger w="50%" justifyContent="center"  value="members">
          
            Login
          </Tabs.Trigger>
          <Tabs.Trigger w="50%" justifyContent="center"  value="projects">
           
            Signup
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="members"><Login/></Tabs.Content>
        <Tabs.Content value="projects"><Signup/></Tabs.Content>
       
      </Tabs.RootProvider>
      </Stack>
      </Box>
      
      
    </Container>
     
  );
}

export default Homepage;
