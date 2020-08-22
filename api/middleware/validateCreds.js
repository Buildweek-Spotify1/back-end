const Users = require("../../users/users-model");

async function validateNewUser(req, res, next) {
    let user = req.body;

    if (user.username) {
        const allUsers = await Users.getUsers();
        let userExists = false;
        allUsers.map(userFromDb => {
            if(userFromDb.username === user.username ) {
                userExists = true;
            }
        })
        if(userExists) {
            res.status(400).json({ message: "That username already exists" })
        }
        if (user.password) {
            if (user.firstName) {
                if (user.lastName) {
                    next();
                } else {
                    res.status(400).json({ message: "please provide a last name" })
                }
            } else {
                res.status(400).json({ message: "please provide a first name" })
            }
        } else {
            res.status(400).json({ message: "please provide a password" })
        }
    } else {
        res.status(400).json({ message: "please provide a username" })
    }
}

function validateUser(req, res, next) {
    let user = req.body;

    if (user.username) {
        if (user.password) {
            next();
        } else {
            res.status(400).json({ message: "please provide a password" })
        }
    } else {
        res.status(400).json({ message: "please provide a username" })
    }
}

module.exports = { validateNewUser, validateUser }