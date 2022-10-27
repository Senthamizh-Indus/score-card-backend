const studentModel = require('../models/student.model');

const addStudent = async (req, res, next) => {
    try {
        const result = req.body;

        await studentModel.addStudent(result)
            .then(function (data) {
                console.log("Student has been stored", data);
                res
                    .status(200)
                    .json({
                        status: 1,
                        message: "Student was successfully stored",
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

const getStudents = async (req, res, next) => {
    try {
        await studentModel.getStudents()
            .then(function (data) {
                console.log("Got all the Students => ", data.rows);
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

module.exports = { addStudent, getStudents }