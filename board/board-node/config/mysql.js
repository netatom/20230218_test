const mysql = require("mysql2");

const db_info = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "test"
}

module.exports = {
    init: () => {
        return mysql.createConnection(db_info)
    },
    connect: conn => {
        conn.connect(err => {
            if (err) {
                console.error("error occur!", err);
            } else {
                console.log("connect success!");
            }
        })
    }
}