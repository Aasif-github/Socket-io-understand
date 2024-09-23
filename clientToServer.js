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

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
});

// Start the server
const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

