const db = require("../models/snapsModel");

const userController = {};

 //this function removes any excess white space from username 
const sanitize = (unsanitizedString) => {
  return unsanitizedString.trim();
};

userController.login = async (req, res, next) => {
  console.log("inside login controller!");
  console.log(
    "this is req.params stuff",
    req.params.username,
    req.params.password
  );
  try {
    //this function removes any excess white space from inputted username 
    sanitize(req.params.username);

    const queryObj = {
      text: "SELECT Users.id, Snaps.snap_id, Snaps.title, Snaps.url, Snaps.snap_text FROM Users LEFT OUTER JOIN Snaps ON Users.id = Snaps.user_id WHERE Users.username = $1 AND Users.password = $2;",
      values: [req.params.username, req.params.password],
    };
    const user = await db.query(queryObj);
    // console.log(user);
    res.locals.user = user.rows;
    // console.log('this is user', user);
    return next();
  } catch {
    const err = {
      log: "Express error handler caught error in userController.login",
      status: 500,
      message: { err: "A massive error occured" + JSON.stringify(process.env) },
    };
    return next(err);
  }
};

userController.signup = async (req, res, next) => {
  try {

    const queryToCheck = {
      text: 'SELECT EXISTS(SELECT * FROM Users WHERE Users.username = $1)',
      values: [req.body.username],
    };

    const userInDB = await db.query(queryToCheck);
    console.log(userInDB.rows[0].exists, 'userInDB.rows[0].username');

    if (userInDB.rows[0].exists) {
      res.locals.newUser = null;
      res.locals.message = `Please make a unique username. ${req.body.username} already exists.`;
      return next();
    }

    const queryObj = {
      text: "INSERT INTO Users (username, password) VALUES ($1, $2)",
      values: [req.body.username, req.body.password],
    };

    const newUser = await db.query(queryObj);
    // console.log(newUser, 'newuser');
    res.locals.newUser = newUser.rows;
    // console.log('this is user', user);
    return next();
  } catch {
    const err = {
      log: "Express error handler caught error in userController.signup",
      status: 500,
      message: { err: "A massive error occured" },
    };
    return next(err);
  }
};

module.exports = userController;
module.exports = sanitize;
