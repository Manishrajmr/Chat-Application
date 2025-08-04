import React from 'react';
import { Stack } from "@chakra-ui/react"
import { Skeleton } from '@chakra-ui/react';



const ChatLoading = () => {
  return (

    <Stack>
      
        <Skeleton height="40px" mb={1} mt={5} />
        <Skeleton height="40px" mb={1}  />
        <Skeleton height="40px" mb={1}  />
        <Skeleton height="40px" mb={1}  />
        <Skeleton height="40px" mb={1}  />
        <Skeleton height="40px" mb={1}  />
        <Skeleton height="40px" mb={1}  />
        <Skeleton height="40px" mb={1}  />
        <Skeleton height="40px" mb={1}  />
        <Skeleton height="40px" mb={1}  />
        <Skeleton height="40px" mb={1}  />
        <Skeleton height="40px" mb={1}  />

    </Stack>
       


   

    
  );
}

export default ChatLoading;
