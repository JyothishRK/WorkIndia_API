import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const adminKey = "highly-secret-key";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 1. The code for registering New User.

app.post("/register", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var newUser = {
        "user_id" : loginDetails.length + 1,
        "username" : username,
        "password" : password,
        "email" : email,
        "accesstoken" : (loginDetails.length + 1) * 100
    }
    loginDetails.push(newUser);
    res.json(newUser);
});

// 2. Code for Login of User
app.post("/login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    const findIndex = loginDetails.findIndex( (user) => user.username == username && user.password == password);
    if(findIndex > -1) {
        res.status(200).json({
            "status" : "Login Successful",
            "status_code" : 200,
            "user_id" : loginDetails[findIndex].user_id,
            "access_token" : loginDetails[findIndex].access_token
        })
    }
    else {
        res.status(401).json({
            "status" : "Incorrect username/password provided. Please retry",
            "status_code" : 401
        })
    }
});

// 3. Code for Adding Shorts 

app.post("/shorts/create", (req, res) => {
    const userKey = req.query.key;
    if(userKey == adminKey) {
        var category = req.body.category;
        var title = req.body.title;
        var author = req.body.author;
        var content = req.body.content;
        var actual_content_link = req.body.actual_content_link;
        var image = req.body.image;
        var upvote = req.body.upvote;
        var downvote = req.body .downvote;
        var newShort = {
            category : category,
            title : title,
            author : author,
            publish_date : new Date(),
            content : content,
            actual_content_link : actual_content_link,
            image : image,
            votes : {
                upvote : upvote,
                downvote : downvote,
            }
        }
        shortsDetails.push(newShort);
        res.json(newShort);
    }
    else{
        res.status(401).json({
            error : "You are not authorized to perform addition of shorts",
            status_code : 401
        })
    }
});

// 4. Code for Shorts-feed for User

app.get("/shorts/feed", (req, res) => {
    res.json(shortsDetails);
})

// 5. Code for user feed based on filters.

app.get("/shorts/filter", (req, res) => {
    var filter = req.query;
    console.log(filter.title);
    console.log(filter.author);
    const findIndex = shortsDetails.findIndex( (shorts) => (shorts.title == filter.title && shorts.author == filter.author));
    if(findIndex > -1) {
        res.status(200).json(shortsDetails[findIndex]);
    }
    else{
        res.status(404).json({
            "error" : "The requested short is not found",
            status_code : 404
        });
    }
});

// Server up and running

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});


var loginDetails = [
    {
        "user_id" : "1",
        "username": "John",
        "password": "test",
        "email": "john@gmail.com",
        "access_token" : 100
    },
    {
        "user_id" : "2",
        "username": "Alexnader",
        "password": "pwd",
        "email": "alex@gmail.com",
        "access_token" : 200
    },
    {
        "user_id" : "3",
        "username": "Guru",
        "password": "secrets",
        "email": "guru@gmail.com",
        "access_token" : 300
    },
    {
        "user_id" : "4",
        "username": "Ram",
        "password": "password",
        "email": "ram@gmail.com",
        "access_token" : 400
    }
];

var shortsDetails = [
    {
        "category": "news",
        "title": "All The Best for placements",
        "author": "Pranav",
        "publish_date": "2023-01-01T16:00:00Z",
        "content": "Lorem ipsum ...",
        "actual_content_link": "http://instagram.com/placements",
        "image": "",
        "votes": {
            "upvote": 0,
            "downvote": 0
        }
    },
    {
        "category": "news",
        "title": "All The Best for placements",
        "author": "Pranav",
        "publish_date": "2023-01-01T16:00:00Z",
        "content": "Lorem ipsum ...",
        "actual_content_link": "http://instagram.com/placements",
        "image": "",
        "votes": {
            "upvote": 0,
            "downvote": 0
        }
    },
    {
        "category": "sports",
        "title": "Ind vs Pak",
        "author": "BCCI",
        "publish_date": "2022-06-01T16:00:00Z",
        "content": "The most awaited game",
        "actual_content_link": "http://instagram.com/cricket-wc",
        "image": "",
        "votes": {
            "upvote": 102,
            "downvote": 3
        }
    },
    {
        "category": "sports",
        "title": "Olympics 2024",
        "author": "Girish",
        "publish_date": "2024-04-01T16:00:00Z",
        "content": "The greatest event to happen",
        "actual_content_link": "http://instagram.com/paris-2024",
        "image": "",
        "votes": {
            "upvote": 1234,
            "downvote": 44
        }
    },
    {
        "category": "news",
        "title": "All The Best for placements",
        "author": "Pranav",
        "publish_date": "2023-01-01T16:00:00Z",
        "content": "Lorem ipsum ...",
        "actual_content_link": "http://instagram.com/placements",
        "image": "",
        "votes": {
            "upvote": 0,
            "downvote": 0
        }
    },

];