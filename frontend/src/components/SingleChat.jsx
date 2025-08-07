import React, { useEffect } from 'react';
import { ChatState } from '@/Context/ChatProvider';
import { Box,Text,Button, IconButton } from '@chakra-ui/react';
import { IoMdArrowBack } from "react-icons/io";
import { getSender, getSenderFull } from '../../config/ChatLogic';
import ProfileModal from './miscellaneous/ProfileModal';
import { Spinner, VStack } from "@chakra-ui/react"
import { useState } from 'react';
import { Field, Input } from "@chakra-ui/react"
import axios from 'axios';

const SingleChat = ({fetchAgain,setFetchAgain}) => {

const {user,selectedChat,setSelectedChat } = ChatState();
const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");


  const fetchMessages = async ()=>{

    if(!selectedChat) return;

    try{
      const config= {
         headers:{
          Authorization: `Bearer ${user.token}`,
         },
      };

      setLoading(true);
      const {data} = await axios.get(`/api/message/${selectedChat._id}`,config);

      console.log(data);
    
      setMessages(data);
      setLoading(false);

    }
    
    catch(error){
      alert("faild to load message");
    }

  }

  useEffect(()=>{
    fetchMessages();
  },[selectedChat])

 const sendMessage = async (event) => {
    if (event.key === "Enter" ) {
      // socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
      
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        
        console.log(data)
        // socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        alert("faild to send message");
        console.log(error);
      }
    }
  };

// const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

  return (
   <>
   {selectedChat ? (
    <>

    <Text   fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            color="white"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
    >
    
    <Button display={{base:"flex",md:"none"}} onClick={()=>setSelectedChat("")} >
      <IoMdArrowBack />
    </Button>


    {!selectedChat.isGroupChat ? (<>{getSender(user,selectedChat.users)}
    {/* <ProfileModal user={getSenderFull(user,selectedChat.users)} /> */}
    
    </>):
    (<>{selectedChat.chatName.toUpperCase()}</>)}

    </Text>

    <Box   display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#262727ff"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden">
      {loading ? (<Spinner alignSelf="center" w={20} h={20} size="xl" margin="auto"/>):
      (
      <div>
            {/* {messages} */}
      </div>
      )}

      <Field.Root  onKeyDown={sendMessage}
              id="first-name"
              mt={3} >
    
      <Input placeholder="me@example.com" color="black"  variant="filled"
                bg="#E0E0E0"
               onChange={(e)=>setNewMessage(e.target.value)}
               value={newMessage}
                />
    </Field.Root>


    

    </Box>
    </>
   ):


   (

    <Box  display="flex" justifyContent="center" alignItems="center" h="100%" >
      <Text>
        Click on user to start chating
      </Text>
    </Box>

   )}
   </>
  );
}
 
export default SingleChat;
