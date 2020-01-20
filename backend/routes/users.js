const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const userRegister = async (req, res) => {
    await check('name').not().isEmpty().withMessage('Name is required').run(req);
    await check('email', 'Email is required').isEmail().run(req);
    await check('password', 'Password must be at least 8 symbols long').isLength({ min: 8 }).run(req);

    const errors = validationResult(req).array();

    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const secretKey = process.env.SECRET_KEY || '';

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            errors.push({
                'msg': 'User with provided email already exists',
                'param': 'email',
            });
            
        }
        if(errors.length) {
            return res.status(422).json({ errors: errors });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
        });

        const newUser = await user.save();

        const token = jwt.sign(
            { userId: newUser.id },
            secretKey,
            {
                expiresIn: '1h'
            }
        );

        return res.json({
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        return res.status(422).json(
            {
                'errors': [{
                    'msg': 'Error: ' + err.message,
                    'param': null,
                }]
            }
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
            return res.status(422).json({
                'errors': [{
                    'msg': 'User with provided email does not exists',
                    'param': 'email',
                }]
            });
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res.status(422).json({
                'errors': [{
                    'msg': 'Password incorrect!',
                    'param': 'password',
                }]
            });
        }
        const token = jwt.sign(
            { userId: user.id },
            secretKey,
            {
                expiresIn: '1h'
            }
        );
        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(422).json(
            {
                'errors': [{
                    'msg': 'Error: ' + err.message,
                    'param': null,
                }]
            }
        );
    }
};

const getUser = async (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}

module.exports = { userRegister, userLogin, getUser };
