const router = require('express').Router();
const User = require('../model/User');

// Validation with JOi
const Joi = require('@hapi/joi');

// This schema is going to be used for validation
const schema = {
	name: Joi.string()
		.min(6)
		.required(),
	email: Joi.string()
		.min(6)
		.required()
		.email(),
	password: Joi.string()
		.min(6)
		.required()
};

// /api/user/register
router.post('/register', async (req, res) => {
	// Let's Validate The Data before we add user
	// It will return an object

	// const validation = Joi.validate(req.body, schema);
	// res.send(validation)

	// As we only want to get error message we can destructure it
	const { error } = Joi.validate(req.body, schema);
	// res.send(error.details[0].message);
	if (error) return res.status(400).send(error.details[0].message);

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
