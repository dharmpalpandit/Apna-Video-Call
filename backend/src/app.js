import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb"}));
app.use(express.urlencoded({ limit:"40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    const connectionDB = await mongoose.connect("mongodb+srv://dharmpalpandit818_db_user:Dharmpal818@cluster0.smo86yl.mongodb.net/?appName=Cluster0")
    console.log(`MONGO Connected DB Host: ${connectionDB.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("Listen on port 8000")
    });
}
start();