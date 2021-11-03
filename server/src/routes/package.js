const express = require('express');
const partModel = require('../models/parts');
const userModel = require('../models/users');
const packageModel = require('../models/packages');
const dbHelper = require('../utils/dbHelper');
const { messageHelper } = require('../utils/messageHelper');

const buildPackageRoute = () => {
   const router = express.Router();

   // #region READ/GET
   router.get('/:id', async (req, res, next) => {
      try {
         const { id } = req.params;
         if (id) {
            if (req.session) {
               if (req.session.userId) {
                  const package = await packageModel.findById(id);
                  if (package) {
                     res.status(200).json({
                        package,
                     });
                  } else {
                     // res.status(400).json({
                     //    message: 'No package found.',
                     // });
                     messageHelper(res, 400, 'notFound', 'Package');
                  }
               } else {
                  res.status(400).json({
                     message: 'No User Found.',
                  });
               }
            }
         } else {
            res.status(400).json({
               message: 'No ID',
            });
         }
      } catch (err) {
         next(err);
      }
   });

   router.get('/', async (req, res, next) => {
      try {
         const { id } = req.params;
         if (id) {
            if (req.session) {
               if (req.session.userId) {
                  const packages = await dbHelper.findObjects(packageModel, req.session.userId);
                  res.status(200).json({
                     packages,
                  });
               } else {
                  messageHelper(res, 500, 'noUserSession');
               }
            } else {
               messageHelper(res, 500, 'noSession');
            }
         } else {
            messageHelper(res, 400, 'noId', 'Package');
         }
      } catch (err) {
         next(err);
      }
   });
   // #endregion

   // #region CREATE/POST
   router.post('/', async (req, res, next) => {
      try {
         const { body } = req;
         console.log(body);
         if (body) {
            if (req.session) {
               if (req.session.userId) {
                  const data = {
                     ...body,
                  };
                  if ('_id' in data) {
                     delete data._id;
                  }
                  if ('__v' in data) {
                     delete data.__v;
                  }
                  console.log(data);
                  const newPack = new packageModel(data);
                  const savedPack = await newPack.save();
                  const foundUser = await userModel.findById(req.session.userId);
                  if (foundUser) {
                     if (savedPack) {
                        foundUser.packages.push(savedPack._id);
                        const savedUser = await foundUser.save();
                        const allPacks = await dbHelper.findObjects(packageModel, foundUser.packages);
                        console.log(allPacks);
                        console.log(savedUser);
                        res.status(201).json({
                           user: savedUser,
                           packages: allPacks,
                        });
                     } else {
                        messageHelper(res, 500, 'noSave', 'Package');
                     }
                  } else {
                     messageHelper(res, 500, 'noUser');
                  }
               } else {
                  messageHelper(res, 500, 'noUserSession');
               }
            } else {
               messageHelper(res, 500, 'noSession');
            }
         } else {
            messageHelper(res, 400, 'noBody');
         }
      } catch (err) {
         next(err);
      }
   });
   // #endregion

   // #region UPDATE/PATCH
   router.patch('/', async (req, res, next) => {
      try {
         const { body } = req;
         if (body) {
            if (req.session) {
               if (req.session.userId) {
                  const foundPack = await packageModel.findById(body._id);
                  if (foundPack) {
                     const data = body;
                     if (data._id) {
                        delete data._id;
                     }
                     if (data.__v) {
                        delete data.__v;
                     }
                     Object.assign(foundPack, data);
                     const savedPack = await foundPack.save();
                     if (savedPack) {
                        res.status(201).json({
                           package: savedPack,
                        });
                     } else {
                        messageHelper(res, 500, 'noSave');
                     }
                  }
               } else {
                  messageHelper(res, 500, 'noUserSession');
               }
            } else {
               messageHelper(res, 500, 'noSession');
            }
         } else {
            messageHelper(res, 400, 'noBody');
         }
      } catch (err) {
         next(err);
      }
   });
   // #endregion

   // #region DELETE
   router.delete('/:id', async (req, res, next) => {
      try {
         const { id } = req.params;
         if (id) {
            if (req.session) {
               if (req.session.userId) {
                  await Promise.all([
                     packageModel.deleteOne({ _id: id}).exec(),
                     partModel.updateMany(
                        { packages: id },
                        { $pull: { packages: id } }
                     ).exec(),
                     userModel.updateOne(
                        { packages: id },
                        { $pull: { packages: id } }
                     ).exec(),
                  ]);
               } else {
                  messageHelper(res, 500, 'noUserSession');
               }
            } else {
               messageHelper(res, 500, 'noSession');
            }
         } else {
            messageHelper(res, 400, 'noId');
         }
      } catch (err) {
         next(err);
      }
   });
   // #endregion
   return router;
};

module.exports = buildPackageRoute;