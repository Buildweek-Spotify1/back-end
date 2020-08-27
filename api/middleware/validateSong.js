const Songs = require("../../songs/songs-model");

function validateSongCreds(req, res, next) {
    const { album, albumCover, title, id, artist } = req.body;

    if (artist) {
        if (id) {
            if (title) {
                if (album) {
                    if (albumCover) {
                        next();
                    } else {
                        res.status(400).json({ message: "Please provide the img for the album cover" });
                    }

                } else {
                    res.status(400).json({ message: "Please provide the name of the album the song is on" });
                }

            } else {
                res.status(400).json({ message: "Please provide the title of the track" });
            }
        } else {
            res.status(400).json({ message: "Please provide a track id" });
        }

    } else {
        res.status(400).json({ message: "Please provide an artist name" });
    }
};

module.exports = { validateSongCreds };