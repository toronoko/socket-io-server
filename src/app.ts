import { Server } from "socket.io";
import Express from "express";
import cors from "cors";

const app = Express();

app.use(cors({ origin: ["https://socket-io-client-eight.vercel.app/"] }));

const port = 8080;

const server = app.listen(port, () => {
  console.log(
    `server is running on https://socket-io-server-clh8.onrender.com/`
  );
});

const io: Server = new Server(server, {
  cors: { origin: ["https://socket-io-client-eight.vercel.app/"] },
} as any);

io.on("connect", (socket) => {
  socket.emit("welcome", `Connected. ${socket.id}`);
  console.log(`Connection sent to ${socket.id}`);
  socket.join("general");

  socket.on("message", (um) => {
    console.log(um);
    socket.to(um.room).emit("newMessage", um.msg);
  });
});
