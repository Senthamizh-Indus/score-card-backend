const connection = require('../configuration/dbConnection');

const addStudent = async (student) => {
    return new Promise(function (resolve, reject) {
        const status = '1';
        connection.query(
            "INSERT INTO public.tbl_student (student_name, standard, section, rollno, status) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
            [student.student_name, student.standard, student.section, student.rollno, status]
        )
        .then(function (data) {
            resolve(data);
        })
        .catch(function (err) {
            var error = new Error(err);
            reject(error);
        });
    });
}

const getStudents = async () => {
    return new Promise(function (resolve, reject) {
        const status = '1';
        connection.query(
            "SELECT * FROM public.tbl_student WHERE status = $1;",
            [status]
        )
        .then(function (data) {
            resolve(data);
        })
        .catch(function (err) {
            var error = new Error(err);
            reject(error);
        });
    })
}

const getStudent = async (id) => {
    return new Promise(function (resolve, reject) {
        const status = '1';
        connection.query(
            "SELECT * FROM public.tbl_student WHERE id = $1 and status = $6;",
            [id, status]
        )
        .then(function (data) {
            resolve(data);
        })
        .catch(function (err) {
            var error = new Error(err);
            reject(error);
        });
    })
}

const updateStudent = async (student) => {
    return new Promise(function (resolve, reject) {
        const status = '1';
        connection.query(
            "UPDATE public.tbl_student SET student_name = $1, standard = $2, section = $3, rollno = $4 WHERE id = $5 and status = $6 RETURNING *;",
            [student.student_name, student.standard, student.section, student.rollno, student.id, status]
        )
        .then(function (data) {
            resolve(data);
        })
        .catch(function (err) {
            var error = new Error(err);
            reject(error);
        });
    })
}

const deleteStudent = async (student_id) => {
    return new Promise(function (resolve, reject) {
        const status = '2';
        connection.query(
            "UPDATE public.tbl_student SET status = $1 WHERE ID = $2;",
            [status, student_id]
        )
        .then(function (data) {
            resolve(data);
        })
        .catch(function (err) {
            var error = new Error(err);
            reject(error);
        });
    })
}

module.exports = { addStudent, getStudents, getStudent, updateStudent, deleteStudent }