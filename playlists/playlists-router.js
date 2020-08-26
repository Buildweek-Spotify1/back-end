const Playlists = require("./playlists-model");
const {validatePlaylistId, validatePlaylistCreds } = require("../api/middleware/validatePlaylist");

const express = require('express');
const router = express.Router();

router.post("/", validatePlaylistCreds, (req, res) => {
    const playlist = req.body;
    Playlists.add(playlist)
        .then(added => {
            res.status(201).json(added);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new playlist' });
        })
});

router.get("/:id", validatePlaylistId, (req, res) => {
    const { id } = req.params;
    Playlists.findById(id)
        .then(playlist => {
            res.status(200).json(playlist);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to retrieve that playlist' });
        })
});

router.get("/user/:id", (req, res) => {
    const { id } = req.params;

    Playlists.find(id)
        .then(playlists => {
            res.status(200).json({ user_id: id, playlists })
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to retrieve that user's playlists" });
        })
});

router.put("/:id", validatePlaylistId, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Playlists.update(changes, id)
        .then(updated => {
            res.status(202).json(updated);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to update that playlist" });
        })
});

router.delete("/:id", validatePlaylistId, (req, res) => {
    const { id } = req.params;


    Playlists.remove(id)
        .then(deleted => {
            res.status(202).json({ message: `Playlist ${id} was successfully deleted` });
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to delete that playlist" });
        })
})

module.exports = router;

