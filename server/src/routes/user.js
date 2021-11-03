const express = require('express');
const userModel = require('../models/users');
const partModel = require('../models/parts');
const packageModel = require('../models/packages');
const { findObjects } = require('../utils/dbHelper');
const { messageHelper } = require('../utils/messageHelper');

const buildRoute = () => {
   const router = express.Router();
   // #region READ/GET
   router.get('/', async (req, res, next) => {
      try {
         const users = await userModel.find();
         res.status(200).json({
            message: 'user route',
            users,
         });
      } catch (err) {
         next(err);
      }
   });

   // Using the $in operator for the list
   router.get('/:id', async (req, res, next) => {
      try {
         const foundUser = await userModel.findById(req.params.id);
         if (foundUser) {
            // OLD : Replaced with findObjects
            // const partColl = await partModel.find({
            //    _id: {
            //       $in: foundUser.parts,
            //    }
            // });

            const parts = await findObjects(partModel, foundUser.parts);
            const packages = await findObjects(packageModel, foundUser.packages);
            res.status(200).json({
               user: foundUser,
               parts,
               packages,
            });
         } else {
            res.status(400).json({
               message: 'No User Found.',
            });
         }
      } catch (err) {
         next(err);
      }
   });
   // #endregion

   // #region UPDATE/PATCH
   router.patch('/:id', async (req, res, next) => {
      try {
         if (req.session) {
            const { userId } = req.session;
            if (userId) {
               const { body } = req;
               if (body) {
                  const foundUser = await userModel.findById(userId);
                  if (foundUser) {
                     var data = body;
                     if (data._id) {
                        delete data._id;
                     }
                     if (data.__v) {
                        delete data.__v;
                     }
                     Object.assign(foundUser, data);
                     const savedUser = await foundUser.save();
                     res.status(201).json({
                        user: savedUser,
                     });
                  } else {
                     res.status(400).json({
                        message: 'No User Found.',
                     });
                  }
               } else {
                  res.status(400).json({
                     message: 'No Body',
                  });
               }
            } else {
               res.status(400).json({
                  message: 'No Session User ID',
               });
            }
         } else {
            res.status(400).json({
               message: 'No Session',
            });
         }
      } catch (err) {
         next(err);
      }
   });
   // #endregion

   // #region DELETE
   // TODO - Need to decide how im going to handle delete
   // #endregion

   return router;
};

module.exports = buildRoute;
