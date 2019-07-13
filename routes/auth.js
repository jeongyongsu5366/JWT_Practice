const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
// /api/user/register
router.post('/register', async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send('Email already exists');

	// Hash the passwords
	// The complexity of the string that this has algorithm get generated
	const salt = await bcrypt.genSalt(10);
	// This salt will be combined with the hashed password
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	// Create a new User
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword
		// password: req.body.password
	});

	try {
		// Store on DB
		const savedUser = await user.save();
		// res.send(savedUser);
		res.send({ user: user._id });
	} catch (err) {
		res.status(400).send(err);
	}
});

//Login
router.post('/login', async (req, res) => {
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Checking if the email exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Email or password is wrong');
	// Password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password);

	if (!validPass) return res.status(400).send('Invalid Password');

	// RIght After validating Password, we're going to res.send jwt
	// res.send('Logged in!');

	// {_id: user._id}, and secret id in .env
	// only our backend server know about TOKEN_SECRET
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);
});

module.exports = router;

// -------------------------------
// Test Case
// {
// 	"email": "jos5366@gmail.com",
// 	"password": "oo101010"
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDJhMzc2MTVlNmIwYzc1MDAyMWRkNjEiLCJpYXQiOjE1NjMwNDg3ODN9.aukShIFQEBUv46aYCwai3a19BkzYWhqwoS27UprvP6I

// go to jwt and check it out
