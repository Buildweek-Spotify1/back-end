const db = require("../data/db-config");

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find(user_id) {
    return db("playlists").where({ user_id });
};

function findById(id) {
    return db("playlists")
        .where({ id })
        .first();

};

async function add(newPlaylist) {


    const [id] = await db("playlists").insert(newPlaylist, "id");
    return findById(id);

};

async function update(changes, id) {
    const playlist_id = await db("playlists").where({ id }).update(changes, "id");
    return findById(playlist_id);
}

function remove(id) {
    return db("playlists").where({ id }).del();
}