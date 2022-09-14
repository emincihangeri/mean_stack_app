const express = require('express');
const app = express();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userRoute = express.Router();
// User model
let User = require('../models/User');

const get_secret = require("../get_secret");
const { ExtractJwt } = require('passport-jwt');
const jwt_decode = require("jwt-decode")

//Authenticate
userRoute.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;


    if(!user){
      return res.json({success: false, message: 'User not found'});
    }
    
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;

      if(isMatch){
        const token = jwt.sign(user.toJSON(), get_secret.secret, {expiresIn: 6049000})
        res.json({
          success: true,
          token: 'Bearer ' + token,
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            password: user.password,
            name: user.name,
            surname: user.surname,
            birthday: user.birthday,
            gender: user.gender,
            designation: user.designation
          }
        })
      }
      else{
        return res.json({
          success: false,
          message: 'Password does not match'
        })
      }
    })
  })
})

//My profile
userRoute.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
})

// Add User
userRoute.post('/create-user', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const token = req.headers.authorization;
      const user = jwt_decode(token);
      if(user.designation === "Regular"){
        res.status(401).json({
          msg: 'Not an admin!'
        })
      }
      else{
        let newUser = new User({
          name: req.body.name,
          surname: req.body.surname,
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          gender: req.body.gender,
          birthday: req.body.birthday,
          designation: req.body.designation
        })
        User.createUser(newUser, (error, user) => {
      
          if (error) {
            return next(error)
          } else {
            
            res.json(newUser)
          }
        })
      }
});
// Get All Users
userRoute.get('/:page/:sort', passport.authenticate('jwt', {session:false}), (req, res) => {
      const token = req.headers.authorization;
      const user = jwt_decode(token);
      if(user.designation === "Regular"){
        res.status(401).json({
          msg: 'Not an admin!'
        })
      }
      else{
        const page = req.params.page
        const sort = req.params.sort
        User.find({})
        .sort([[sort, 1]])
        .limit(3)
        .skip((page-1)*3)
        .exec((error, data) => {
        if (error) {
          return next(error)
        } else {
        res.json(data);
        console.log(data);
      }
    })}
  
})
// Get single user
userRoute.get('/read/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  const token = req.headers.authorization;
      const user = jwt_decode(token);
      if(user.designation === "Regular"){
        res.status(401).json({
          msg: 'Not an admin!'
        })
      }
      else{
        User.findById(req.params.id, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })
      }
  
})

// Update user
userRoute.put('/update/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
      const token = req.headers.authorization;
      const user = jwt_decode(token);
      if(user.designation === "Regular"){
        res.status(401).json({
          msg: 'Not an admin!'
        })
      }
      else{
        User.findByIdAndUpdate(req.params.id, {
          $set: req.body
        }, (error, data) => {
          if (error) {
            return next(error);
            console.log(error)
          } else {
            res.json(data)
            console.log('Data updated successfully')
          }
        })
      }
})
// Delete user
userRoute.delete('/delete/:id', passport.authenticate('jwt', {session:false}),(req, res, next) => {
      const token = req.headers.authorization;
      const user = jwt_decode(token);
      if(user.designation === "Regular"){
        res.status(401).json({
          msg: 'Not an admin!'
        })
      }
      else{
        const query = {_id: req.params.id}
        User.findOneAndDelete(query, (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.status(200).json({
              msg: data
            })
          }
        })
      }
  
})
module.exports = userRoute;