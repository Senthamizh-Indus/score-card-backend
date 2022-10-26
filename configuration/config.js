require('dotenv').config({ path: '../.env' });

const config = {
	// use your own Db //
	db: {
		DB_HOST: process.env.DB_HOST,
		DB_NAME: process.env.DB_NAME,
		DB_USER: process.env.DB_USER,
		DB_PASS: process.env.DB_PASS,
		DB_PORT: process.env.DB_PORT,
	},

	// Jwt
	jwt: {
		secret: process.env.JWT_SECRET
	}
};

module.exports = config;
