import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


const ChatPage = () => {

  const [chats , setChats] = useState([]);

  const fetchChats = async () =>{ 
    const {data} = await axios.get("/api/chats");
    setChats(data);
    console.log(chats);
  }

  useEffect(()=>{
    fetchChats();
  },[]);

  return (
    <div>
      {chats.map((chat) => (
        <h1 key={chat.id}>{chat.chatName}</h1>
      ))}
    </div>
  );
}

export default ChatPage;
