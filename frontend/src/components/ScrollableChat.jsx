import React from 'react';
import { ChatState } from '@/Context/ChatProvider';
import { Tooltip,Avatar } from '@chakra-ui/react';

import { isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser} from "../../config/ChatLogic";
 

const ScrollableChat = ({messages}) => {

  const {user} = ChatState();

  return (
    <div style={{}} >
    
    {messages && messages.map((m,i)=>(
        <div  style={{display:"flex",}} key={m._id} >
              {(isSameSender(messages,m,i,user._id)
            ||isLastMessage(messages,i,user._id)
            ) && (
                <Tooltip.Root content="nbbvn" placement="bottom-start" showArrow>
                      {/* <Avatar.Root    />
                        <Avatar.Root mt="7px" mr={1} size="sm" background="black" cursor="Pointer" name={m.sender.name} src={m.sender.pic}>
                        <Avatar.Image src="https://bit.ly/sage-adebayo" />
                    </Avatar.Root> */}


                <Avatar.Root size="sm" cursor="pointer" backgroundColor="green" mr={1} mt="7px" >
                      <Avatar.Fallback name={m.sender.name} />
                      <Avatar.Image src="https://bit.ly/sage-adebayo" />
                </Avatar.Root>

                        
                </Tooltip.Root>

            //    <Tooltip.Root>
                //  <Avatar.Root size="sm" >
                //       <Avatar.Fallback name="Segun Adebayo" />
                //       <Avatar.Image src="https://bit.ly/sage-adebayo" />
                // </Avatar.Root>
            //    </Tooltip.Root>
            )}
            <span  style={{backgroundColor:`${m.sender._id===user._id ? "teal":"green"}`,cursor:"pointer", borderRadius:"20px",padding:"3px 15px",maxWidth:"75%",marginLeft:isSameSenderMargin(messages,m,i,user._id),marginTop:isSameUser(messages,m,i,user._id)?3:10}} >{m.content}</span>
        </div>
    ))}
      
    </div>



  );
}

export default ScrollableChat;
