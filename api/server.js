const express = require("express");
const cors = require("cors");
const restricted = require("../api/middleware/restricted");

const server = express();
const authRouter = require("../auth/auth-router");
const playlistRouter = require("../playlists/playlists-router");
const songRouter = require("../songs/songs-router");

server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/playlists",restricted, playlistRouter);
server.use("/api/songs",restricted, songRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });

  module.exports = server;