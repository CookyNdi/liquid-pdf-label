const express = require('express');
const { hello, wellcome } = require('./controlers.js');
const userRouter = express.Router();

userRouter.post('/pdf', hello);
userRouter.post('/wellcome', wellcome);

module.exports = userRouter;
