const mysql = require("mysql2");

const db_info = {
	host: "localhost",
	port: "3306",
	user: "root",
	password: "",
	database: "test"
};

module.exports = {
	init: function () {
		return mysql.createConnection(db_info);
	},
	connect: function (conn) {
		conn.connect(function (err) {
			if (err) console.error("error");
			else console.log("success");
		});
	}
};
