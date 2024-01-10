const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/login/:username/:password', userController.login, (req,res) => {
  return res.status(200).json(res.locals.user);
});

router.post('/signup', userController.signup, (req,res) => {
  console.log(res.locals.newUser, 'res locals newuser')

  if (!res.locals.newUser) return res.status(200).json(res.locals.message);

  return res.status(200).json(res.locals.newUser);
});


module.exports = router;