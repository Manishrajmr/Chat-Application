import React from 'react';
import { Box,Text,Menu,Portal,IconButton} from '@chakra-ui/react';
import { Tooltip} from "@/components/ui/tooltip"
import { Button,Avatar } from "@chakra-ui/react"
import { useState } from 'react';

import { ChatState } from '@/Context/ChatProvider';

const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

   const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

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

    <Tooltip content="Search User to Chat">
      <Button variant="ghost">
        <i class="fas fa-search"></i>

        <Text>
            Search User 
        </Text>
        
      </Button>
    </Tooltip>

    <Text fontSize="2xl" color="teal" >
        BuzzTalk
    </Text>
    
    <div>



<Menu.Root>
    <i className="fas fa-bell" style={{ marginRight: "8px" }}></i>
            
<Menu.Trigger asChild>
    
  <Button variant="" size="sm" gap="20px">
    
     <Avatar.Root size="sm" >
      <Avatar.Fallback name="Segun Adebayo" />
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
    </Avatar.Root>

    <i className="fas fa-chevron-down"></i>
  </Button>
</Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="new-txt-a">
              My Profile <Menu.ItemCommand></Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item value="new-file-a">
              Logout<Menu.ItemCommand></Menu.ItemCommand>
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
