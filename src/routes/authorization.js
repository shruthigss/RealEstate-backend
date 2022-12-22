const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: "please add all the fields",
    });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({
          error: "user already exists with that email",
        });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
        });
        user
          .save()
          .then((user) => {
            res.json({
              message: "saved successfully",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: "please add email or password",
    });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, email } = savedUser;
          res.json({ token, user: { _id, email } });
        } else {
          return res.status(422).json({ error: "Invalid  password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
