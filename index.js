import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002", // Your frontend's URL
    methods: ["GET", "POST"],
  },
});

// app.get('/', (req, res) => {
//   res.send('Socket.IO Server Running');
// });


// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static("public"));

// Socket connection event
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);
    
  //2. Listen for messages from the client
  socket.on("chat message", (message) => {
    console.log('step 2');
    console.log('msg:', message);
    //3. Emit the message to all clients
    io.emit("chat message", message); // send message to all clients
    console.log('step 3');
    });
});

// Start the server
const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});