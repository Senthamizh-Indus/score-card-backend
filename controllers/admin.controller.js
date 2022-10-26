const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin.model');
const Config = require('../configuration/config');

const signUpAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const admin = {
            username: username,
            password: passwordHash,
        };

        await adminModel.signUpAdmin(admin)
            .then(function (data) {
                res
                    .status(200)
                    .json({
                        status: 1,
                        message: "Admin was registered successfully",
                    })
                    .end();
            })
            .catch((err) => {
                console.error(err);
                res
                    .status(400)
                    .json({
                        status: 3,
                        message: err,
                    })
                    .end();
            });
    } catch (err) {
        console.error(err);
        res
            .status(400)
            .json({
                status: 3,
                message: err,
            })
            .end();
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        await adminModel.getAdminByName(username)
            .then(function (user) {
                //check for user
                if (!user.rowCount > 0) {
                    return res.status(404).json({errors: 'User not found!'});
                }
                
                let originalPassword = user.rows[0].password;
            
                //check for password
                bcrypt
                    .compare(password, originalPassword)
                    .then((isMatch) => {
                        if (isMatch) {
                            // user matched
                            console.log('matched!')
                            const { id, username, password } = user.rows[0];
                            const payload = { id, username }; //jwt payload
                
                            jwt.sign(payload, Config.jwt.secret, { 
                                expiresIn: 3600
                            }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                        } else {
                            return res.status(400).json({errors: 'Password not correct'});
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        res
                            .status(400)
                            .json({
                                status: 3,
                                message: err,
                            })
                            .end();
                    });
            })
            .catch((err) => {
                console.error(err);
                res
                    .status(400)
                    .json({
                        status: 3,
                        message: err,
                    })
                    .end();
            });
    } catch (err) {
        console.error(err);
        res
            .status(400)
            .json({
                status: 3,
                message: err,
            })
            .end();
    }
}

const getAllAdmin = async (req, res, next) => {
    try {
        await adminModel.getAllAdmin()
            .then(function (data) {
                console.log("Got all the admins");
                res
                    .status(200)
                    .json({
                        status: 1,
                        data: data.rows,
                    })
                    .end();
            })
            .catch((err) => {
                console.error(err);
                res
                    .status(400)
                    .json({
                        status: 3,
                        message: err,
                    })
                    .end();
            });
    } catch (err) {
        console.error(err);
        res
            .status(400)
            .json({
                status: 3,
                message: err,
            })
            .end();
    }
}

const addResults = async (req, res, next) => {
    try {
        const jo = {
            "part1": {
                "subjects": [
                    {
                        "subject": "English",
                        "Marks": {
                            "FA": 10,
                            "Oral": 5,
                            "SA": 10,
                            "Oral": 5,
                            "OverAll": 30
                        }
                    },
                    {
                        "subject": "Tamil",
                        "Marks": {
                            "FA": 10,
                            "Oral": 5,
                            "SA": 10,
                            "Oral": 5,
                            "OverAll": 30
                        }
                    },
                    {
                        "subject": "Maths",
                        "Marks": {
                            "FA": 10,
                            "Oral": 5,
                            "SA": 10,
                            "Oral": 5,
                            "OverAll": 30
                        }
                    },
                ],
                "grandTotal": 90,
                "percentage": 30,
                "rank": 23
            },
            "part2": {
                "Development and maturity": "A",
                "Responsibility": "B",
                "Craft": "A"
            },
            "part3": {
                "workingDays": 31,
                "daysPresent": 28,
                "perentage": 90
            },
            "cgp": "4.5",
            "grade": "D"
        }

        const result = req.body;

        await adminModel.addResults(result)
            .then(function (data) {
                console.log("Result has been stored", data);
                res
                    .status(200)
                    .json({
                        status: 1,
                        message: "Result was successfully stored",
                    })
                    .end();
            })
            .catch((err) => {
                console.error(err);
                res
                    .status(400)
                    .json({
                        status: 3,
                        message: err,
                    })
                    .end();
            });

    } catch (err) {
        console.error(err);
        res
            .status(400)
            .json({
                status: 3,
                message: err,
            })
            .end();
    }
}

const getResults = async (req, res, next) => {
    try {
        await adminModel.getResults()
            .then(function (data) {
                console.log("Got all the results => ", data.rows);
                res
                    .status(200)
                    .json({
                        status: 1,
                        data: data.rows,
                    })
                    .end();
            })
            .catch((err) => {
                console.error(err);
                res
                    .status(400)
                    .json({
                        status: 3,
                        message: err,
                    })
                    .end();
            });
    } catch (err) {
        console.error(err);
        res
            .status(400)
            .json({
                status: 3,
                message: err,
            })
            .end();
    }
}

module.exports = { signUpAdmin, login, getAllAdmin, addResults, getResults }