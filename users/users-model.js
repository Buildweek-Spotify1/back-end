const db = require("../data/db-config");

module.exports = {
    addUser,
    findById,
    findUser
}

async function addUser(newUser) {


    // const [id] = await db("users").insert(newUser);
    // return findById(id);
    return db("users").insert(newUser).returning("*");
}

function findById(id) {
    return db("users")
        .select("users.id", "users.username", "users.firstName", "users.lastName")
        .where({ id })
        .first();
}

function findUser(filter) {
    return db("users")
        .where(filter)
        .first();
}