const connection = require('../configuration/dbConnection');
 
const signUpAdmin = async (admin) => {
    return new Promise(function (resolve, reject) {
        connection.query(
            "INSERT INTO public.tbl_admin (username, password) VALUES ($1::character varying, $2::character varying);",
            [admin.username, admin.password]
        )
        .then(function (data) {
            console.log("Query data => ", data);
            resolve(data);
        })
        .catch(function (err) {
            var error = new Error(err);
            reject(error);
        });
    });
}

const getAdmin = async (user) => {
    return new Promise(function (resolve, reject) {
        connection.query(
            "SELECT id, username FROM public.tbl_admin WHERE id = $1",
            [user.id]
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

const getAdminByName = async (username) => {
    return new Promise(function (resolve, reject) {
        connection.query(
            "SELECT * FROM public.tbl_admin WHERE username = $1",
            [username]
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

const getAllAdmin = async () => {
    return new Promise(function (resolve, reject) {
        connection.query(
            "SELECT id, username FROM public.tbl_admin"
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

module.exports = { signUpAdmin, getAdmin, getAdminByName, getAllAdmin }
