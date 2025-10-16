import { Server } from "socket.io";
import Express from "express";
import cors from "cors";

const app = Express();

app.use(cors({ origin: ["http://localhost:5173"] }));

const port = 8080;

const server = app.listen(port, () => {
  console.log(`server is running on http://localhost:8080`);
});

const io: Server = new Server(server, {
  cors: { origin: ["http://localhost:5173"] },
} as any);

io.on("connect", (socket) => {
  socket.emit("welcome", `Connected. ${socket.id}`);
  console.log(`Connection sent to ${socket.id}`);
  console.log(socket.rooms);
  socket.join("general");
  console.log(socket.rooms);

  socket.on("message", (um) => {
    console.log(um);
    socket.to(um.room).emit("newMessage", um.msg);
  });

  socket.data.username = "Alice";
});
