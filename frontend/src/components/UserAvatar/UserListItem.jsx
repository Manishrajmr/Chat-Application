import React from 'react';
import { ChatState } from '@/Context/ChatProvider';
import {Box,Text} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react';

const UserListItem = ({user,handleFunction}) => {


  return (
     <Box
      onClick={handleFunction}
      cursor="pointer"
    
      bg="black"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      gap="10"
      color="white"
      mt={4}
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      
             <Avatar.Root size="sm" >
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src={user.pic} />
            </Avatar.Root>
        
     
      <Box  >
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>

    
  );

   
}

export default UserListItem;
