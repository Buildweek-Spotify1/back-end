const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
const createToken = require("../tools/create-token");
const { validateNewUser, validateUser } = require("../api/middleware/validateCreds");

router.post("/signup", validateNewUser, (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    

    Users.addUser(user)
        .then(newUser => {
            
            const token = createToken(newUser);
            res.status(201).json({createdUser: newUser, token });
        })
        .catch(err => {
            res.status(500).json({ message: "we were unable to add this user",  err });
        })
});

router.post("/login", validateUser, (req, res) => {
    const { username, password } = req.body;

    Users.findUser({ username: username })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = createToken(user);
                res.status(200).json({ token: token })
            } else {
                res.status(401).json({ message: "That is an invalid password" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "We were unable to retrieve that user" })
        })
});

module.exports = router;