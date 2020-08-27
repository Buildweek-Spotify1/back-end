const Playlists = require("./playlists-model");
const Songs = require("../songs/songs-model");
const { validatePlaylistId, validatePlaylistCreds } = require("../api/middleware/validatePlaylist");
const { validateSongCreds } = require("../api/middleware/validateSong")

const express = require('express');
const router = express.Router();

router.post("/", validatePlaylistCreds, (req, res) => {
    const playlist = { user_id: req.decodedJwt.subject, playlist_name: req.body.playlist_name }
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

router.get("/", (req, res) => {
    const id = req.decodedJwt.subject;

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

router.post("/:id/songs", validatePlaylistId, validateSongCreds, async (req, res) => {
    const song = req.body;
    const playlistId = req.params.id;
    const playlist = await Playlists.findById(playlistId);

    const newSong = await Songs.add(song);
    const songId = newSong.id;
    console.log("song and play", songId, playlistId)

    const updated = await Playlists.addSongToPlaylist(songId, playlistId);

    res.status(200).json({ id: playlistId, playlist_name: playlist.playlist_name, songs: updated });

});

router.get("/:id/songs", async (req, res) => {
    const { id } = req.params;
    const playlist = await Playlists.findById(id);
    const songs = await Playlists.playlistSongs(id);
    res.status(200).json({ id, playlist_name: playlist.playlist_name, songs });

});

router.delete("/:id/songs/:songId", async (req, res) => {
    const { id, songId } = req.params;
    const songs = await Playlists.removeSongPlaylist(id, songId);
    const playlist = await Playlists.findById(id);
    res.status(200).json({ id, playlist_name: playlist.playlist_name, songs });
})

module.exports = router;

