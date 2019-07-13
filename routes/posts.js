// Now this place is private place
const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
	// res.json({ posts: { title: 'my first post', description: "random data you shouldn't access" } });
	res.send(req.user);
	// User.findbyOne({ _id: req.user });
});

module.exports = router;

// /api/posts
// get, Access Denied

// In order to log in here
// We go o api/user/login

// jos5366@gmail.com
// oo101010

// copy the token and get back to api/posts
// add the token to header like
// auth-token, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDJhMzc2MTVlNmIwYzc1MDAyMWRkNjEiLCJpYXQiOjE1NjMwNDk5NTZ9.hB5jRCGBy-ku1_diQTkcdtIvGRR99JQxGFowWPYUTvw
