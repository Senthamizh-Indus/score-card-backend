const connection = require('../configuration/dbConnection');
var format = require('pg-format');

const addResult = async (result) => {

    const subjects = result.subjects;
    const student_id = result.student_id;
    const status = '1';
    let values = [];

    for (const i in subjects) {
        let value = [subjects[i].subject, subjects[i].faMark, subjects[i].faOralMark, subjects[i].saMark, subjects[i].saOralMark, subjects[i].overallMark, student_id, status];
        values.push(value);
    }

    const query = format('INSERT INTO public.tbl_results (subject, "faMark", "faOralMark", "saMark", "saOralMark", "overallMark", student_id, status) VALUES %L', values);
    return new Promise(function (resolve, reject) {
        connection.query(
            query
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

const getResult = async (id) => {
    return new Promise(function (resolve, reject) {
        const status = '1';
        connection.query(
            "SELECT * FROM public.tbl_results WHERE student_id = $1 and status = $2;",
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

module.exports = { addResult, getResult }