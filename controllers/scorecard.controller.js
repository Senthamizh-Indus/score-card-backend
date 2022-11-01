const scorecardModel = require('../models/scorecard.model');

const addResult = async (req, res, next) => {
    try {
        const result = req.body;
        console.log("Result request => ", result);
        await scorecardModel.addResult(result)
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
        await scorecardModel.getResults()
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

const getResult = async (req, res, next) => {
    try {
        const id = req.params;
        await scorecardModel.getResult(id)
            .then(function (data) {
                console.log("Got the result => ", data.rows);
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

const updateResult = async (req, res, next) => {
    try {
        const result = req.body;
        await scorecardModel.updateResult(result)
            .then(function (data) {
                console.log("Result got updated => ", data.rows);
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

const deleteResult = async (req, res, next) => {
    try {
        const result = req.body;
        await scorecardModel.deleteResult(result)
            .then(function (data) {
                console.log("Result got Deleted => ", data.rows);
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

module.exports = { addResult, getResults, getResult, updateResult, deleteResult }