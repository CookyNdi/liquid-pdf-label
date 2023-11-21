const express = require('express');
const { hello, wellcome } = require('./controlers.js');
const userRouter = express.Router();

userRouter.post('/pdf', hello);
userRouter.get('/wellcome', wellcome);

module.exports = userRouter;
