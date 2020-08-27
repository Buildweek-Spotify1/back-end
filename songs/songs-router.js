const express = require('express');
const router = express.Router();
const Axios = require("axios");
const qs = require("qs");

router.get("/search", (req,res)=>{
    Axios.post('https://accounts.spotify.com/api/token',
      qs.stringify({
        grant_type: 'client_credentials'
      }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: process.env.CLIENT_ID || "4774db1a6cc749d2b07ce2d23707c3df",
          password: process.env.CLIENT_SECRET || "2b7d1098a7774a369c2a9f9d7d683ee1"
        }
      }
    )
      .then(res => {
        res.status(200).json({spotifyToken: res.data.access_token})
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
})

module.exports = router;