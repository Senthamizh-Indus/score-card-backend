const studentModel = require('../models/student.model');

const addStudent = async (req, res, next) => {
    try {
        const student = req.body;

        await studentModel.addStudent(student)
            .then(function (data) {
                console.log("Student has been stored", data.rows[0]);
                res
                    .status(200)
                    .json({
                        status: 1,
                        message: "Student was successfully stored",
                        data: data.rows[0]
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

const getStudent = async (req, res, next) => {
    try {
        const student_id = req.body;
        await studentModel.getStudent(student_id.id)
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

const updateStudent = async (req, res, next) => {
    try {
        const student = req.body;
        console.log("Request body => ", student);
        await studentModel.updateStudent(student)
            .then(function (data) {
                console.log("Student was updated => ", data.rows);
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


const deleteStudent = async (req, res, next) => {
    try {
        const student = req.body;
        await studentModel.deleteStudent(student.id)
            .then(function (data) {
                console.log("Student was deleted => ", data.rows);
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

module.exports = { addStudent, getStudents, getStudent, updateStudent, deleteStudent }