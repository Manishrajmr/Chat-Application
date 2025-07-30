const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const path = require("path");

const cors = require("cors");
const app = express();
app.use(cors());


require('dotenv').config();
connectDB();

app.use(express.json()); // to accept json data

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("Chat Application Server is running...");
});

// //send all chat 

// app.get("/api/chats",(req,res)=>{
//   res.send(chats);
// });

// //send chat based on user req using dynamic routing

// app.get("/api/chat/:id",(req,res)=>{
//   // console.log(chats);
//   // res.send(chats);
//   const chatId = req.params.id;
//   const chat = chats.filter(chat => chatId==chat.id);
//   res.send(chat);
  
// });



PORT =  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
