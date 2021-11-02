const express = require('express');
const partModel = require('../models/parts');
const userModel = require('../models/users');
const dbHelper = require('../utils/dbHelper');
const { messageHelper } = require('../utils/messageHelper');

/**
 * Gets all parts.
 * @param {ObjectId[]} userId
 */
// const getPartsObject = async (partIds) => {
//    if (partIds.length > 0) {
//       const p = await partModel.find({
//          _id: {
//             $in: partIds,
//          }
//       });
//       return dbHelper.listToDict(p);
//    }
// }

const buildRoute = () => {
   const router = express.Router();
   // #region READ
   router.get('/:id', async (req, res, next) => {
      try {
         const part = await partModel.findById(req.params.id);
         res.status(200).json(part);
      } catch (err) {
         next(err);
      }
   });
   // #endregion

   // #region CREATE
   router.post('/', async (req, res, next) => {
      try {
         const { body } = req;
         if (body) {
            if (req.session) {
               if (req.session.userId) {
                  const newPart = new partModel(body);
                  const savedPart = await newPart.save();
                  if (savedPart) {
                     const foundUser = await userModel.findById(req.session.userId);
                     if (foundUser) {
                        foundUser.parts.append(savedPart._id);
                        await foundUser.save();
                        res.status(201).json({
                           user: foundUser,
                           // partsList: foundUser.parts,
                        });
                     } else {
                        res.status(400).json({
                           message: 'Unable to find user.',
                        });
                     }
                  } else {
                     res.status(400).json({
                        message: 'Part save failed.',
                     });
                  }
               } else {
                  res.status(400).json({
                     message: 'Session User ID not found.',
                  });
               }
            } else {
               res.status(500).json({
                  message: 'No Session',
               });
            }
         } else {
            res.status(400).json({
               message: 'No Body.',
            });
         }
      } catch (err) {
         next(err);
      }
   });

   router.post('/:partName', async (req, res, next) => {
      try {
         const { partName } = req.params;
         if (partName) {
            if (req.session) {
               if (req.session.userId) {
                  const newPart = new partModel({
                     partName,
                  });
                  const user = await userModel.findById(req.session.userId);
                  if (user) {
                     const savedPart = await newPart.save();
                     user.parts.push(savedPart._id);
                     const savedUser = await user.save();
                     if (savedUser) {
                        if (savedPart) {
                           const parts = await dbHelper.findObjects(partModel, user.parts);
                           res.status(201).json({
                              user: savedUser,
                              parts,
                           });
                        } else {
                           res.status(400).json({
                              message: 'New Part failure.',
                           });
                        }
                     } else {
                        res.status(400).json({
                           message: 'User Save Failure',
                        });
                     }
                  } else {
                     res.status(400).json({
                        message: 'No User Found.',
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
         } else {
            res.status(400).json({
               message: 'No Part Name.',
            });
         }
      } catch (err) {
         next(err);
      }
   });
   // #endregion

   // #region UPDATE
   router.patch('/', async (req, res, next) => {
      try {
         const { body } = req;
         if (body) {
            const foundPart = await partModel.findById(body._id);
            if (foundPart) {
               var data = body;
               delete data._id;
               delete data.__v;
               Object.assign(foundPart, data);
               const savedPart = await foundPart.save();
               if (savedPart) {
                  res.status(201).json({
                     part: savedPart,
                  });
               } else {
                  res.status(400).json({
                     message: 'Unable to save part',
                  });
               }
            } else {
               res.status(400).json({
                  message: 'No Part found',
               });
            }
         } else {
            res.status(400).json({
               message: 'No Body.',
            });
         }
      } catch (err) {
         next(err);
      }
   });
   // #endregion

   // #region DELETE
   router.delete('/', async (req, res, next) => {
      try {
         const { body } = req;
         if (body) {
            if (req.session) {
               if (req.session.userId) {
                  const foundUser = await userModel.findById(req.session.userId);
                  if (foundUser) {
                     const index = foundUser.parts.findIndex(body._id);
                     if (index > 0) {
                        await partsModel.remove({
                           _id: body._id,
                        });
                        foundUser.parts = foundUser.parts.splice(index, 1);
                        const savedUser = await foundUser.save();
                        res.status(200).json({
                           user: savedUser,
                           partId: body._id,
                        });
                     } else {
                        res.status(400).json({
                           message: 'Unable to find part.',
                        });
                     }
                  } else {
                     res.status(400).json({
                        message: 'No User found.',
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
         } else {
            res.status(400).json({
               message: 'No Body.',
            });
         }
      } catch (err) {
         next(err);
      }
   });
   router.delete('/:id', async (req, res, next) => {
      try {
         const { id } = req.params;
         if (id) {
            if (req.session) {
               if (req.session.userId) {
                  const foundUser = await userModel.findById(req.session.userId);
                  if (foundUser) {
                     const index = foundUser.parts.findIndex(id);
                     if (index > 0) {
                        await partsModel.remove({
                           _id: id,
                        });
                        foundUser.parts = foundUser.parts.splice(index, 1);
                        const savedUser = await foundUser.save();
                        res.status(200).json({
                           user: savedUser,
                           partId: id,
                        });
                     } else {
                        res.status(400).json({
                           message: 'Unable to find part.',
                        });
                     }
                  } else {
                     res.status(400).json({
                        message: 'No User found.',
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
         } else {
            res.status(400).json({
               message: 'No ID.',
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
