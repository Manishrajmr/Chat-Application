import React from 'react';
import { ChatState } from '@/Context/ChatProvider';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box,Stack,Text} from '@chakra-ui/react';
import { Button} from '@chakra-ui/react';
import ChatLoading from './ChatLoading';
import { getSender } from '../../config/ChatLogic';
import GroupChatModal from './miscellaneous/GroupChatModal';
 
const MyChats = ({fetchAgain}) => {

  const [loggedUser, setLoggedUser] = useState();
 
  const {selectedChat,setSelectedChat,user,chats,setChats} = ChatState();

  console.log("my chats",chats);


   const fetchChats = async () => {
    console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log("data is here",data);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
      //set user from the local storage
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="black"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "22px", md: "20px" }}
        fontFamily="revert"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
       

        

        <GroupChatModal>
              <Button >New Group Chat</Button>
        </GroupChatModal>
     
         
       
      </Box>

      

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="black"
        w="100%"
        h="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack >
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "white"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="sm"
                borderWidth="1px "
                key={chat._id}
                _hover={{
                 background: "#38B2AC",
                 color: "white",
                }}
               
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}  
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}

        

       
      </Box>
    </Box>

  );
}

export default MyChats;
