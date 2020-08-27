const db = require("../data/db-config");

module.exports = {
    add,
    findById
}

async function add(newSong) {


    await db("songs").insert(newSong, "id");
    return findById(newSong.id);

};

function findById(id) {
    return db("songs")
        .where({ id })
        .first();

};