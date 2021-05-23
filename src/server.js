import path, {join} from "path";
import express from "express";
import logger from "morgan";
import socketController from "./socketController.js";
import events from "./events.js";
import * as socketIO from "socket.io";

const __dirname = path.resolve();

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "src/views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "src/static")));
app.get("/", (req, res) =>  res.render("home", { events: JSON.stringify(events) })
);



const handleListening = () =>
  console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);
const io = new socketIO.Server(server);

io.on("connection", socket => socketController(socket));
