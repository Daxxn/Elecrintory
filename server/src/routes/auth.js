const express = require('express');
const userModel = require('../models/users');
const bCrypt = require('bcrypt');
const { messageHelper } = require('../utils/messageHelper');

const buildRoute = () => {
   const router = express.Router();
   // #region POST
   router.post('/login', async (req, res, next) => {
      if (req.session) {
         if (req.session.userId) {
            res.status(200).json({
               message: 'User is already logged in.'
            });
         }
         const { body } = req;
         if (body) {
            try {
               const user = await userModel.findOne({
                  username: body.username
               });
               if (user) {
                  if ((await bCrypt.compare(body.password, user.hash))) {
                     req.session.userId = user._id;
                     req.session.save();
                     // res.redirect(`/api/user/${user._id}`);
                     res.status(200).json({
                        user,
                     });
                  }
               } else {
                  res.status(401).json({
                     message: 'No user found.',
                  });
               }
            } catch (err) {
               next(err);
            }
         } else {
            res.status(401).json({
               message: 'No Body.',
            });
         }
      } else {
         const { body } = req;
         if (body) {
            try {
               const user = await userModel.findOne({
                  username: body.username
               });
               if (user) {
                  if ((await bCrypt.compare(body.password, user.hash))) {
                     req.session.userId = user._id;
                     req.session.save();
                     res.redirect(`/api/user/${user._id}`);
                  }
               } else {
                  res.status(401).json({
                     message: 'No user found.',
                  });
               }
            } catch (err) {
               next(err);
            }
         } else {
            res.status(401).json({
               message: 'No Body.',
            });
         }
      }
   });

   router.get('/logout', async (req, res, next) => {
      try {
         if (req.session) {
            if (req.session.userId) {
               req.session.userId = null;
               res.status(200).json({
                  message: 'user logged out.',
               });
            }
         } else {
            res.status(400).json({
               message: 'No user is logged in.',
            });
         }
      } catch (err) {
         next(err);
      }
   });

   router.post("/register", async (req, res, next) => {
      try {
         if (req.session) {
            if (req.session.userId) {
               res.status(401).json({
                  message: "user is logged in.",
               });
            }
         }
         const { body } = req;
         if (body) {
            if (body.username && body.password) {
               console.log(body);
               const foundUsers = await userModel.find({
                  username: body.username,
               });
               console.log(foundUsers);
               if (foundUsers.length == 0) {
                  const newHash = await bCrypt.hash(body.password, 10);
                  const newUser = new userModel({
                     username: body.username,
                     hash: newHash,
                  });
                  const savedUser = await newUser.save();
                  res.status(201).json({
                     message: "user created.",
                     userId: savedUser._id,
                  });
               } else {
                  res.status(400).json({
                     message: "user already exists.",
                  });
               }
            } else {
               res.status(400).json({
                  message: "No username or password.",
               });
            }
         } else {
            res.status(400).json({
               message: "No Body.",
            });
         }
      } catch (err) {
         next(err);
      }
   });

   router.post("/unregister", async (req, res, next) => {
      try {
         if (req.session) {
            if (req.session.userId) {
               const foundUser = await userModel.findById(req.session.userId);
               if (foundUser) {
                  const foundParts = await partModel;
               } else {
                  res.status(400).json({
                     message: "User not found.",
                  });
               }
            } else {
               res.status(500).json({
                  message: "No User Session.",
               });
            }
         } else {
            res.status(500).json({
               message: "No session.",
            });
         }
      } catch (err) {
         next(err);
      }
   });
   // #endregion

   return router;
};

module.exports = buildRoute;
