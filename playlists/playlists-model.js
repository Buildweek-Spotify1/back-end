const db = require("../data/db-config");

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find(user_id) {
    return db("playlists").select("playlists.id","playlists.playlist_name" ).where({ user_id });
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
    await db("playlists").where({ id }).update(changes, "id");
    return findById(id);
}

function remove(id) {
    return db("playlists").where({ id }).del();
}