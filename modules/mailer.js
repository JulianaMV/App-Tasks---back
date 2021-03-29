const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

require('dotenv').config();

console.log(process.env.PASS);

const transport = nodemailer.createTransport({
	host: process.env.HOST,
	port: process.env.PORT,
	auth: { user : process.env.DB_USER, pass: process.env.PASS},
});

transport.use('compile', hbs({
	viewEngine:{
		defaultLayout: undefined,
		partialsDir: path.resolve('RestAPI/resources/mail/')
	},
	viewPath: path.resolve('RestAPI/resources/mail/'),
	extName: '.html',
}));

module.exports = transport;
