const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

router.post('/register', [
    check('name')
        .not().isEmpty()
        .withMessage('Name is required'),
    check('email', 'Email is required')
        .isEmail(),
    check('password', 'Password must be at least 8 symbols long')
        .isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            throw new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
        });

        const result = await user.save();

        return res.json({ id: result.id });
    } catch (err) {
        return res.status(400).json('Error: ' + err.message);
    }
});

router.post('/login', [
    check('email', 'Email is required')
        .isEmail(),
    check('password', 'Password is incorrect!')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 symbols long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const email = req.body.email;
        const password = req.body.password;
        const secretKey = process.env.SECRET_KEY || '';

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            secretKey,
            {
                expiresIn: '1h'
            }
        );
        return res.json({ userId: user.id, token: token });
    } catch (err) {
        return res.status(400).json('Error: ' + err.message);
    }
});

module.exports = router;
