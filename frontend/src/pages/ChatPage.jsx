"use client"
import React from 'react';
import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Toaster, toaster } from "@/components/ui/toaster"
import { Box } from '@chakra-ui/react';
import {ChatState} from '../Context/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '@/components/MyChats';
import ChatBox from '@/components/ChatBox';



const ChatPage = () => {
  const {user} = ChatState();



  return (

      <div style={{width:"100%"}} >
        {user || <SideDrawer/> }

        <Box
        display="flex"
        justifyContent="space-between"
        w='100%'
        background="blue"
        h="91.5vh"
        p="10px"
        >
          {user || <MyChats/>}
          {user || <ChatBox/>}
        </Box> 
       
      </div>
     
  );
}

export default ChatPage;
