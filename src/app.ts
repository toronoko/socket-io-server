import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "https://socket-io-client-eight.vercel.app",
  "http://localhost:5173",
];

app.use(cors({ origin: allowedOrigins }));

const port = 8080;

const server = app.listen(port, () => {
  console.log(
    `server is running on https://socket-io-server-1-kkw2.onrender.com`
  );
});

app.get("/", (req: Request, res: Response) => {
  (res as any).send("Hello there");
});

const io: Server = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
} as any);

io.on("connect", (socket) => {
  socket.on("welcome", (hm) => {
    socket.emit("newJoin", hm);
    console.log(hm);
  });
  console.log(`Connection sent to ${socket.id}`);
  socket.join("general");

  socket.on("message", (um) => {
    console.log(um);
    socket.to(um.room).emit("newMessage", um.msg);
  });
});
