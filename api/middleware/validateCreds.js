function validateNewUser(req, res, next) {
    let user = req.body;

    if (user.username) {
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