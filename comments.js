//create  web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const User = require('./models/user');
const Post = require('./models/post');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/meanstack', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb');
});
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in db connection : ' + err);
    }
});

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//GET all comments
app.get('/comments', (req, res, next) => {
    Comment.find((err, comments) => {
        if (err) {
            return res.status(500).json({ msg: err });
        }
        return res.json(comments);
    });
});

//GET all comments by post id
app.get('/comments/:id', (req, res, next) => {
    Comment.find({ postId: req.params.id }, (err, comments) => {
        if (err) {
            return res.status(500).json({ msg: err });
        }
        return res.json(comments);
    });
});

//GET comment by id
app.get('/comment/:id', (req, res, next) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            return res.status(500).json({ msg: err });
        }
        return res.json(comment);
    });
});

//POST comment
app.post('/comment', (req, res, next) => {
    const comment = new Comment({
        postId: req.body.postId,
        userId: req.body.userId,
        comment: req.body.comment
    });
    comment.save((err, comment) => {
        if (err) {
            return res.status(500).json({ msg: err });
        }
        return res.json(comment);
    });
});

//PUT comment
app.put('/comment/:id', (req, res, next) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, comment) => {var express = require('express');
