const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

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



// // --------------------------deployment------------------------------

// const __dirname1 = path.resolve();


//   app.use(express.static(path.join(__dirname1, "/frontend/dist")));

//  app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
// })
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
// });



// // --------------------------deployment------------------------------

// // Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);



PORT =  process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

//  Attach Socket.IO to the server

const io = require('socket.io')(server,{
  pingTimeout:6000,
  cors:{
       origin:"https://chat-application-yl96.vercel.app/"
  }
});

//  Socket.IO events

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

