const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const userRegister = async (req, res) => {
    await check('name').not().isEmpty().withMessage('Name is required').run(req);
    await check('email', 'Email is required').isEmail().run(req);
    await check('password', 'Password must be at least 8 symbols long').isLength({ min: 8 }).run(req);
  
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
            return res.status(422).json({'errors':[{
                'msg': 'User with provided email already exists',
                'param': 'email',
            }]});
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
        return res.status(422).json(
            {'errors':[{
                'msg': 'Error: ' + err.message,
                'param': null,
            }]}
        );
    }
};

const userLogin = async (req, res) => {
    await check('email', 'Email is required').isEmail().run(req);
    await check('password', 'Password must be at least 8 symbols long').isLength({ min: 8 }).run(req);

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
            return res.status(422).json({'errors':[{
                'msg': 'User with provided email does not exists',
                'param': 'email',
            }]});
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res.status(422).json({'errors':[{
                'msg': 'Password incorrect!',
                'param': 'password',
            }]});
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
        return res.status(422).json(
            {'errors':[{
                'msg': 'Error: ' + err.message,
                'param': null,
            }]}
        );
    }
};

module.exports = {userRegister, userLogin};
