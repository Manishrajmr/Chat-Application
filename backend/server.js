const express = require("express");
const app = express();
const {chats} = require('./data/data');
const connectDB = require("./config/db");


require('dotenv').config();
connectDB();

app.get("/", (req, res) => {
  res.send("Chat Application Server is running...");
});

//send all chat 

app.get("/api/chats",(req,res)=>{
  res.send(chats);
});

//send chat based on user req using dynamic routing

app.get("/api/chat/:id",(req,res)=>{
  // console.log(chats);
  // res.send(chats);
  const chatId = req.params.id;
  const chat = chats.filter(chat => chatId==chat.id);
  res.send(chat);
  
});

PORT =  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
