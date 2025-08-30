import React from 'react';
import { Box,Text,Menu,Portal,IconButton,Popover} from '@chakra-ui/react';
import { Tooltip} from "@/components/ui/tooltip"
import { Button,Avatar } from "@chakra-ui/react"
import { useState } from 'react';
import { toaster } from "@/components/ui/toaster"
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { useHistory } from 'react-router-dom/';
import { Spinner, VStack } from "@chakra-ui/react"


import { 
  CloseButton,
  Drawer,
  Input,
  Stack,
} from "@chakra-ui/react"
import { useRef } from "react"

import { ChatState } from '@/Context/ChatProvider';
import ProfileModal from './ProfileModal';





const SideDrawer = () => {

  const history = useHistory();
  
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  // console.log("loading chat",loadingChat);


   const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const ref = useRef<HTMLInputElement>(null);


  const handleSearch = async() =>{

    if(!search){
     alert("search name");
     return;
    }

     try {
      setLoading(true);

     

       const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log("started");

      const { data } = await axios.get(`https://chat-application-g7r8-d2ugardhl-manish-rajs-projects-f5ae813e.vercel.app/api/user?search=${search}`,config);

      console.log(data);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      
         console.log(error.message);
    }
    
  }

   const accessChat = async (userId) => {
    console.log(userId);
    try {
      setLoadingChat(true);
     
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      // console.log(data);

      if ( !chats.find((c) => c._id === data._id)) {
              setChats([data, ...chats]);
}
      setSelectedChat(data);
      setLoadingChat(false);
      // onClose();
    } catch (error) {
     
      alert("wrong");
    }
  };

   const logoutHandler = () => {
  //  localStorage.removeItem("userInfo");
  localStorage.clear();
   history.push("/");
  };



  return (
    <>
      <Box
       display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="black"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px">

    <Drawer.Root placement="left" initialFocusEl={() => ref.current}>

      <Tooltip content="Search User to Chat" >
         <Drawer.Trigger asChild>

         <Button variant="ghost">
        <i class="fas fa-search"></i>

        <Text>
            Search User 
        </Text>
        
      </Button>
     
      </Drawer.Trigger>
      </Tooltip>
     
      <Portal  >
        <Drawer.Backdrop />
        <Drawer.Positioner  >
          <Drawer.Content >
            <Drawer.Header>
              <Drawer.Title>Search User</Drawer.Title>
            </Drawer.Header>

            
            <Drawer.Body w="100%"   >

             <Drawer.Body  p={0} display="flex"  gap="10px">

               <Input value={search} onChange={(e)=>setSearch(e.target.value)} />
              <Button onClick={handleSearch} >
                Go
              </Button>
             </Drawer.Body>

              {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              )) 
            )}
            {loadingChat &&   <Spinner color="teal.500" size="lg" />}
             
            </Drawer.Body>
       
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>

    </Drawer.Root>



  



    <Text  sm={{fontSize:'2xl'}} color="teal" >
        BuzzTalk
    </Text>
    
    <div>



<Menu.Root>
    <i className="fas fa-bell" style={{ marginRight: "8px" }}></i>
            
<Menu.Trigger asChild>
    
  <Button variant="" size="sm" gap="20px">
    
     <Avatar.Root size="sm" >
      <Avatar.Fallback name={user.name} />
      {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
    </Avatar.Root>

    <i className="fas fa-chevron-down"></i>
  </Button>
</Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>


           

            <ProfileModal>
                <Menu.Item value="new-txt-a">
              My Profile
            </Menu.Item> 
            </ProfileModal>
           

            <Menu.Item value="new-file-a" onClick={logoutHandler} >
              Logout
            </Menu.Item>

          
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
    </div>

  </Box>




    </>
  );
}


export default SideDrawer;


