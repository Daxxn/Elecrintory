// #region Imports
require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('morgan');
const cors = require('cors');
const http = require('http');
const session = require('express-session');
const MongoSession = require('connect-mongo');
const userModel = require('./models/users');
const { messageHelper, messages } = require('./utils/messageHelper');


// #region Routes
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const partsRoute = require('./routes/part');
// #endregion

// #endregion

// #region Test Route
const homeRoute = (app) => {
   app.get('/', (req, res, next) => {
      res.status(200).json({
         message: 'Home'
      });
   });
};
// #endregion

// #region Build Routes
const apiRoutes = (app, db) => {
   app.use(async (req, res, next) => {
      console.log('In auth check middleware');
      if (req.session) {
         if (req.session.userId) {
            console.log('User logged in.');
            next();
         } else {
            console.log('user NOT logged in.');
            res.status(401).json({
               message: messages[401]['notLoggedIn'],
            });
            // messageHelper(res, 401, 'notLoggedIn');
         }
      } else {
         console.log('User NOT logged in / SESSION issue.');
         res.status(401).json({
            message: messages[401]['notSession'],
         });
         // messageHelper(res, 401, 'noSession');
      }
   });
   const apiRouter = express.Router();
   apiRouter.use('/user', userRoute());
   apiRouter.use('/parts', partsRoute());
   app.use('/api', apiRouter);
};
// #endregion

// #region Middleware
const initMiddleware = (app) => {
   app.use(cors({
      origin: 'http://localhost:3000',
      exposedHeaders: [
         'Access-Control-Allow-Origin',
         'Content-Type'
      ],
      allowedHeaders: [
         'Access-Control-Allow-Origin',
         'Content-Type'
      ],
      credentials: true,
   }));
   // app.options('/', (req, res, next) => {
   //    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
   // });
   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));
   app.use(express.static(path.join(__dirname, 'public')));
   if (process.env.DEBUG) {
      app.use(debug('dev'));
   }
};
// #endregion

// #region Error Handling
const initErrorHandler = (app) => {
   app.use((err, req, res, next) => {
      if (process.env.DEBUG) {
         res.locals.mesage = err.message;
         res.locals.err = err;
         console.log(err);
      }
      res.status(err.status || 500).json(err);
   });
}
// #endregion

// #region Session Init
const initSession = (app) => {
   app.use(session({
      secret: process.env.SECRET,
      store: MongoSession.create({
         mongoUrl: process.env.DB_CONNECT,
      }),
      cookie: {
         secure: false,
         maxAge: 6000000,
      },
      resave: true,
      saveUninitialized: true,
   }))
}
// #endregion

// #region Database
const databaseConnection = (app, callback) => {
   const db = mongoose.connect(process.env.DB_CONNECT, {}, callback);
   apiRoutes(app, db);
   return db;
};
// #endregion

// #region Startup
const startExpress = () => {
   const app = express();
   initMiddleware(app);
   initSession(app);
   homeRoute(app);
   app.use('/auth', authRoute());
   initErrorHandler(app);
   return app;
};

const start = () => {
   const app = startExpress();
   const server = http.createServer(app);
   databaseConnection(app, (err) => {
      if (err) {
         console.log(err);
      } else {
         console.log('Connected to database');
         server.listen(process.env.PORT, (err) => {
            if (err) {
               console.log(err);
            } else {
               console.log(`Started Server : ${process.env.PORT}`);
            }
         });
      }
   });
   return app;
}
// #endregion

module.exports = start();