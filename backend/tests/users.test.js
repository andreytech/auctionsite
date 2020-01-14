const faker = require('faker');
const User = require('../models/user.model');
const { userRegister, userLogin } = require('../routes/users');
const mongo = require('mongoose');

jest.mock('../models/user.model');

describe('userRegister testing', () => {
    let userObj, req, res;
    const randomUserID = mongo.Types.ObjectId();

    beforeEach(() => {
        userObj = {
            email: faker.internet.email(),
            password: '12345678',
            name: faker.name.findName()
        };
        req = { body: userObj };
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };

    })

    test('register successfully', () => {
        User.findOne.mockResolvedValue(null);
        jest.spyOn(User.prototype, 'save').mockImplementationOnce(() =>
            Promise.resolve({ id: randomUserID }));
        // jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => 
        //     Promise.reject());

        return userRegister(req, res).then(data => {
            expect(res.json).toBeCalledWith({ id: randomUserID });
            expect(User.findOne).toBeCalledWith({ email: userObj.email });
        });
    });

    test('user with email already exist', () => {
        User.findOne.mockResolvedValue({ id: randomUserID });
        jest.spyOn(User.prototype, 'save').mockImplementationOnce(() =>
            Promise.resolve({ id: randomUserID }));

        return userRegister(req, res).then(data => {
            expect(res.json).toBeCalledWith({
                'errors': [{
                    'msg': 'User with provided email already exists',
                    'param': 'email',
                }]
            });
            expect(res.status).toBeCalledWith(422);
        });
    });

    test('password too short', () => {
        req.body.password = '12';

        User.findOne.mockResolvedValue({ id: randomUserID });

        return userRegister(req, res).then(data => {
            expect(res.json).toBeCalledWith({
                'errors': [{
                    'msg': 'Password must be at least 8 symbols long',
                    'param': 'password',
                    'value': '12',
                    'location': 'body'
                }]
            });
            expect(res.status).toBeCalledWith(422);
        });
    });

});

describe('userLogin testing', () => {
    let userObj, req, res;

    beforeEach(() => {
        userObj = {
            email: faker.internet.email(),
            password: faker.internet.password,
        };
        req = { body: userObj };
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };

    })

    test('successful login', () => {
        req.body.password = '12345678';
        const existingUser = {
            'id': mongo.Types.ObjectId(),
            'email': faker.internet.email(),
            'name': faker.name.findName(),
            'password': '$2a$12$lHhPMhXMapZIuyqi5mOy3.oRdHUtVfnOHZt9z0J8HJLQRWdRw2O2C'
        };
        User.findOne.mockResolvedValue(existingUser);

        return userLogin(req, res).then(data => {
            expect(res.json).toBeCalledWith(
                expect.objectContaining({
                    user: {
                        id: existingUser.id,
                        email: existingUser.email,
                        name: existingUser.name
                    },
                    token: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
                })
            );
            // expect(User.findOne).toBeCalledWith({ email: userObj.email });
        });

    })

    test('user does not exist', () => {
        req.body.password = '12345678dfd';
        User.findOne.mockResolvedValue(null);

        return userLogin(req, res).then(data => {
            expect(res.json).toBeCalledWith({'errors':[{
                'msg': 'User with provided email does not exists',
                'param': 'email',
            }]});
        });

    })

    test('password wrong', () => {
        req.body.password = '12345678df';
        const existingUser = {
            'id': mongo.Types.ObjectId(),
            'email': faker.internet.email(),
            'password': '$2a$12$lHhPMhXMapZIuyqi5mOy3.oRdHUtVfnOHZt9z0J8HJLQRWdRw2O2C'
        };
        User.findOne.mockResolvedValue(existingUser);

        return userLogin(req, res).then(data => {
            expect(res.json).toBeCalledWith({'errors':[{
                'msg': 'Password incorrect!',
                'param': 'password',
            }]});
        });

    })

});