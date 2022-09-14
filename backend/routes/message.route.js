const express = require('express');
const app = express();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const messageRoute = express.Router();
// Message model
let Message = require('../models/Message');
const { query } = require('express');
// Add Message
messageRoute.route('/send').post(passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Message.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log(data)
    }
  })
});
// Get Inbox Messages
messageRoute.route('/inbox/:email/:page/:sort').get(passport.authenticate('jwt', {session:false}), (req, res) => {
    const query = {receiver: req.params.email}
    const page = req.params.page
    const sort = req.params.sort
    console.log(sort)
    Message.find(query)
      .sort([[sort, 1]])
      .limit(5)
      .skip((page-1)*5)
      .exec((error, data) => {
      if (error) {
      return next(error)
      } else {
      res.json(data);
      console.log(data);
      }
    })
})
// Get Outbox Messages
messageRoute.route('/outbox/:email/:page/:sort').get(passport.authenticate('jwt', {session:false}), (req, res) => {
    const query = {sender: req.params.email}
    const page = req.params.page
    const sort = req.params.sort
    console.log(sort)
    Message.find(query)
      .sort([[sort, -1]])
      .limit(5)
      .skip((page-1)*5)
      .exec((error, data) => {
      if (error) {
      return next(error)
      } else {
      res.json(data);
      console.log(data);
      }
    })
})

// Get single message
messageRoute.route('/read/:id').get(passport.authenticate('jwt', {session:false}), (req, res) => {
  Message.findById(req.body.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Delete message
messageRoute.route('/delete-message/:id').delete(passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const query = {_id: req.params.id}
  Message.findOneAndDelete(query, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = messageRoute;