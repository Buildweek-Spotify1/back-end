const Playlists = require("../../playlists/playlists-model");
const Users = require("../../users/users-model");


async function validatePlaylistId(req, res, next) {
    const { id } = req.params;

    Playlists.findById(id)
        .then(playlist => {
            if (playlist) {
                next();
            } else {
                res.status(404).json({ message: "There is no playlist that matches that id" });
            }
        })
};

async function validatePlaylistCreds(req, res, next) {
    const { playlist_name } = req.body;

    if(playlist_name) {
        next();
    } else {
        res.status(400).json({ message: "Please provide a name for the playlist" });  
    }

    
}


module.exports = { validatePlaylistId, validatePlaylistCreds };