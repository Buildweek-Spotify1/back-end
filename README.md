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

