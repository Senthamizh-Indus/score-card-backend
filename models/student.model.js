const connection = require('../configuration/dbConnection');

const addStudent = async (result) => {
    return new Promise(function (resolve, reject) {
        connection.query(
            "INSERT INTO public.tbl_student (student_name, standard, section) VALUES ($1, $2, $3);",
            [result.student_name, result.standard, result.section]
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
        connection.query(
            "SELECT * FROM public.tbl_student;"
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

module.exports = { addStudent, getStudents }