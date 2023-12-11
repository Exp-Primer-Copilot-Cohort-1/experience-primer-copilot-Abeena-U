//Create web server
var express = require('express');
var app = express();

//Create server
var server = require('http').createServer(app);

//Create socket io
var io = require('socket.io')(server);

//Create mongoose
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://localhost:27017/chatbox', {useNewUrlParser: true});

//Create schema
var chatSchema = mongoose.Schema({
    nick: String,
    msg: String,
    created: {type: Date, default: Date.now}
});

//Create model
var Chat = mongoose.model('Message', chatSchema);

//Get index.html
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//Get data from database
app.get('/messages', function(req, res){
    Chat.find({}, function(err, messages){
        res.send(messages);
    });
});

//Get user from database
app.get('/users', function(req, res){
    User.find({}, function(err, users){
        res.send(users);
    });
});

//Get user from database
app.get('/users/:id', function(req, res){
    User.find({_id: req.params.id}, function(err, users){
        res.send(users);
    });
});

//Get user from database
app.get('/users/:nick', function(req, res){
    User.find({nick: req.params.nick}, function(err, users){
        res.send(users);
    });
});

//Get user from database
app.get('/users/:nick/:pass', function(req, res){
    User.find({nick: req.params.nick, pass: req.params.pass}, function(err, users){
        res.send(users);
    });
});

//Create user schema
var userSchema = mongoose.Schema({
    nick: String,
    pass: String,
    created: {type: Date, default: Date.now}
});

//Create user model
var User = mongoose.model('User', userSchema);

//Create user
app.post('/users', function(req, res){
    var user = new User(req.body);
    user.save(function(err){
        if(err) throw err;
        io.emit('user', req.body);
        res.sendStatus(200);
    });
});

//Create message
app.post('/messages', function(req, res){
    var message = new Chat(req.body);
    message.save(function(err){
        if(err) throw err;
        io.emit('message', req.body);