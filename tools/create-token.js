const secrets = require("../config/secrets");
const jwt = require("jsonwebtoken");

function createToken(user) {

    const payload = {
        subject: user.id,
        username: user.username
    }

    const secret = secrets.jwtSecret;

    const options = {
        expiresIn: "1h"
    }

    return jwt.sign(payload, secret, options)
};

module.exports = createToken;