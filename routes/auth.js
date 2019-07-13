const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');
// /api/user/register
router.post('/register', async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send('Email already exists');

	// Create a new User
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	try {
		// Store on DB
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

// Joi.validate Result, and put invalid value
// {
// 	"name" : "SU JEONG",
// 	"email": "akh5366@gmail.com",
// 	"password": "123456"
// }

// {
// 	"error": null,
// 	"value": {
// 			"name": "SU JEONG",
// 			"email": "akh5366@gmail.com",
// 			"password": "123456"
// 	}
// }

// Error Case
// {
// 	"name" : "SUG",
// 	"email": "akh5366@gmail.com",
// 	"password": "123456"
// }
module.exports = router;
