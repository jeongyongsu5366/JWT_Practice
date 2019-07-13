// Validation with JOi
const Joi = require('@hapi/joi');

// This schema is going to be used for Register Validation
const registerValidation = data => {
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

	return Joi.validate(data, schema);
};

// Login Validation
const loginValidation = data => {
	const schema = {
		email: Joi.string()
			.min(6)
			.required()
			.email(),
		password: Joi.string()
			.min(6)
			.required()
	};

	return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
