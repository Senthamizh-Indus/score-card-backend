const connection = require('../configuration/dbConnection');

const addResult = async (result) => {
    return new Promise(function (resolve, reject) {
        connection.query(
            "INSERT INTO public.tbl_results (part1, part2, part3, cgp, grade, student_id) VALUES ($1, $2, $3, $4, $5, $6);",
            [result.part1, result.part2, result.part3, result.cgp, result.grade, result.student_id]
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
        connection.query(
            "SELECT * FROM public.tbl_results;"
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

module.exports = { addResult, getResults }