const login = require('../validators/auth.validator');
const admin = require('../validators/admin.validator');
const student = require('../validators/student.validator');

module.exports = { login, admin, student }