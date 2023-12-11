//create web server
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

//create server
const server = http.createServer(app);

//use body-parser
app.use(bodyParser.urlencoded({extended: false}));

//create a route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/new_comment', (req, res) => {
    res.sendFile(__dirname + '/new_comment.html');
});

app.post('/create_comment', (req, res) => {
    const comment = req.body.comment;
    const name = req.body.name;
    fs.appendFileSync('comments.txt', name + ' said: ' + comment + '\n');
    res.redirect('/comments');
});

app.get('/comments', (req, res) => {
    const comments = fs.readFileSync('comments.txt', 'utf8');
    res.send(comments);
});

//start server
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
