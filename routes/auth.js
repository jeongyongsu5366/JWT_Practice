const router = require('express').Router();
const User = require('../model/User');
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

	res.send('Logged in!');
});

module.exports = router;

// {
// 	"name" : "Heather",
// 	"email": "jojos55151@gmail.com",
// 	"password": "oo101010"
// }

// We can find the hased password
// {
// 	"_id": "5d2a36cc73bf665dc86e031c",
// 	"name": "Heather",
// 	"email": "jojos55151@gmail.com",
// 	"password": "$2a$10$Vt/jvviQ2vOir4uuwEwhN.ciVN2D.ZJafXz/oxnbYSaT5k6nhvXc6",
// 	"date": "2019-07-13T19:53:48.941Z",
// 	"__v": 0
// }

// -------------------------------
// Test Case
// {
// 	"email": "jos5366@gmail.com",
// 	"password": "oo101010"
// }

// Logged in!
