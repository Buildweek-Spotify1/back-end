const db = require("../data/db-config");

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    addSongToPlaylist
}

function find(user_id) {
    return db("playlists").select("playlists.id", "playlists.playlist_name").where({ user_id });
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

async function addSongToPlaylist(song_id, playlist_id) {
    await db("playlist_songs").insert({ song_id, playlist_id }, "playlist_id");
    
    return playlistSongs(playlist_id);

}

function playlistSongs(id) {
    return db("playlist_songs as ps")
        .join("playlists as p", "p.id", "ps.playlist_id")
        .join("songs as s", "s.id", "ps.song_id")
        .select("p.id", "p.playlist_name", "s.artist","s.title", "s.album", "s.albumCover", "s.id")
        .where({playlist_id: id});
}