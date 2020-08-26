# back-end

## Usage

### Base URL:
https://spotify1-pt-bw.herokuapp.com/

----------------------------------------

## Authentication Routes

### User Sign Up
#### POST */api/auth/signup*

Registers a new user account in the database

Request: 
```
{
    firstName: "someName",
    lastName: "someLastName",
    username: "someUsername",
    password: "somePassword"
}
```

Response: 
```
{
    "createdUser": {
        "id": 1,
        "firstName": "someName",
        "lastName": "someLastName",
        "username": "someUsername"
        // password not returned, but is stored encrypted in the database.
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ..."  // valid for one hour.
}
```

-------------------------------------------

### User Login
#### POST */api/auth/login*

Authenticates user's credentials, returns JSON object with token

Request: 
```
{
    username: "someUsername",
    password: "somePassword"
}
```

Response: 
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ..."  // valid for one hour.
}
```

### User Add a playlist
#### POST */api/playlists*

Verifies that a user is logged in and then return JSON object with new playlist info

Request: 
```
{
    playlist_name: "some playlist name"
}
```

Response: 
```
{
    "id": 1,
    "playlist_name": "some playlist name",
    "user_id": 4
}
```

### Get a single playlist
#### GET */api/playlists/:id*           //id is the id of the playlist

Verifies that a user is logged in and then return JSON object with playlist info


Response: 
```
{
    "id": 1,
    "playlist_name": "some playlist name",
    "user_id": 4
}
```

### Get all the playlists for the user that is logged in
#### GET */api/playlists*  

Verifies that a user is logged in and then return JSON object with all that user's playlist info


Response: 
```
{
    "user_id": 4,
    "playlists": [
        {
            "id": 1,
            "playlist_name": "playlist 1"
        },
        {
            "id": 3,
            "playlist_name": "playlist 2"
        },
        {
            "id": 4,
            "playlist_name": "playlist 3"
        }
    ]
}
```

### Update the name of a playlist
#### PUT */api/playlists/:id*           //id is the id of the playlist

Verifies that a user is logged in and then return JSON object with updated playlist info


Response: 
```
{
    "id": 1,
    "playlist_name": "some playlist new name",
    "user_id": 4
}
```

### Update the name of a playlist
#### DELETE */api/playlists/:id*            //id is the id of the playlist

Verifies that a user is logged in and then return successful delete message


Response: 
```
{
    "message": "Playlist 3 was successfully deleted"
}
```

