const router = require('express').Router();
const User = require('../model/User');

// When we go to register
// /api/user/register
router.post('/register', async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		date: req.body.date
	});

	try {
		// Store on DB
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

// /api/user/login
// router.post('/login', (req, res) => {
// 	res.send();
// });

module.exports = router;
