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

const getResults = async () => {
    return new Promise(function (resolve, reject) {
        const status = '1';
        connection.query(
            "SELECT * FROM public.tbl_results WHERE status = $1;",
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

const updateResult = async (result) => {
    return new Promise(function (resolve, reject) {
        const status = '1';
        connection.query(
            "UPDATE public.tbl_results SET subject = $1, faMark = $2, faOralMark = $3, saMark = $4, saOralMark = $5, overallMark = $6 WHERE id = $7 and status = $8 RETURNING *;",
            [result.subject, result.faMark, result.faOralMark, result.saMark, result.saOralMark, result.overallMark, result.id, status]
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

const deleteResult = async (result) => {
    return new Promise(function (resolve, reject) {
        const status = '2';
        connection.query(
            "UPDATE public.tbl_results SET status = $1 WHERE id = $2;",
            [status, result.id]
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

module.exports = { addResult, getResults, getResult, updateResult, deleteResult }