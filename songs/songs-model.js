const db = require("../data/db-config");

module.exports = {
    add,
    findById,
    getAllSongs
}

function getAllSongs() {
    return db("songs");
}

async function add(newSong) {

    const dbSongs = await getAllSongs();
    let notInDB = true;
    dbSongs.map(song => {

        if (song.id === newSong.id) {
            notInDB = false;
        }
    })

    if (notInDB) {
        await db("songs").insert(newSong, "id");
        return findById(newSong.id);
    } else {
        return findById(newSong.id);
    }




};

function findById(id) {
    return db("songs")
        .where({ id })
        .first();

};