// Import dependencies and routes
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const db = require('./configuration/dbConnection');
const adminRoute = require('./routes/admin.route');
const serverless = require('serverless-http');

// Create Express app
const app = express();

// Set view engine to Html
app.set('view engine', 'html');

app.use(cookieParser());

// Configure bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
require('./middlewares/passport')(passport);

// Routes
app.use('/', adminRoute);
app.get('/', (req, res)=> {
  const sql = 'SELECT * FROM tbl_admin WHERE id = $1';
  const values = ["1"];
  db.query(sql, values).then(response => {
    const data = response.rows;
    data.forEach(row => console.log(row));
    res.json({msg: "success", data: data});
  });
});

app.use('/.netlify/functions/server', adminRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
module.exports.handler = serverless(app);