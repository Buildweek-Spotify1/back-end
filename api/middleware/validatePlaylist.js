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
    const { user_id, playlist_name } = req.body;

    if(playlist_name) {
        if (user_id) {
            const user = await Users.findById(user_id);
            if (user) {
                next();
            } else {
                res.status(404).json({ message: "There is no user that matches that id" });
            }
        } else {
            res.status(400).json({ message: "Please provide a user id" });
        }
    } else {
        res.status(400).json({ message: "Please provide a name for the playlist" });  
    }

    
}


module.exports = { validatePlaylistId, validatePlaylistCreds };