import path, {join} from "path";
import express from "express";
import * as socketIO from "socket.io";

const __dirname = path.resolve();

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "src/views"));
app.use(express.static(join(__dirname, "src/static")));
app.get("/", (req, res) => res.render("home"));



const handleListening = () =>
  console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);
const io = new socketIO.Server(server);

