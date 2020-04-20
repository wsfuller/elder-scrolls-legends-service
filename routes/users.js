const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('you got users breh');
  // try {
  //   const education = await Education.find();
  //   res.json(education);
  // } catch (err) {
  //   res.json({ message: err });
  // }
});

// Create
router.post('/create', async (req, res) => {
  const {
    body: { email, firstName, lastName, username, password },
  } = req;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save((error) => {
      if (error) {
        console.log(error);
        res.json({ error });
      } else {
        const token = jwt.sign(
          { user: { firstName, lastName, username } },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.TOKEN_EXPIRATION,
          }
        );
        res.json(token);
      }
    });
  } catch (error) {
    console.log('Error creating user: ', error);
    res.status(500).send(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log('login function: ', req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send(`No user with ${email} exists`);
    }

    const doPasswordsMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (doPasswordsMatch) {
      const { firstName, lastName, username, _id } = user;
      const token = jwt.sign(
        {
          user: {
            id: _id,
            firstName,
            lastName,
            username,
          },
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        }
      );
      res.status(200).json(token);
    } else {
      res.status(401).send('Passwords do not match');
    }
  } catch (error) {
    res.status(500).send(`Error during the login process: ${error}`);
  }
});

// Update

// Delete

module.exports = router;
