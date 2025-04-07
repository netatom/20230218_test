const express = require("express")
const multer = require("multer")
const cors = require("cors")
const fs = require("fs")
const db = require("./config/mysql.js")
const { match } = require("assert")
const app = express()
const conn = db.init()
//Multer 설정(메모리에 파일 저장)
const upload = multer({ storage: multer.memoryStorage() })

app.use(express.urlencoded({extended:true}))
// cors를 전체로 허용
app.use(cors())
app.use(express.json())

// 한글처리
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
	res.send("Api is Running")
})

app.get("/posts", function(req, res) {
	const sql = "SELECT * FROM `todo` ORDER BY id LIMIT 100;";
	conn.query(sql, function(err, result) {
		if (err) console.log("error: " + err);
		else res.send(result);
	});
});


app.post("/posts", function(req, res) {
	const body = req.body
	const sql = "INSERT INTO `todo` (`text`) VALUES (?)"
	const params = [body.text]
	conn.query(sql, params, function(err, result) {
		if (err) console.log("error: " + err);
		else res.send(result);
	});

});

app.post("/post/delete/:id", function(req, res) {
	const sql = "DELETE FROM todo where id =?"
	const params = [req.params.id]
	conn.query(sql, params, function(err, result) {
		if (err) console.log("error: " + err);
		else res.send(result);
	});
});

app.post("/post/update/:id", function(req, res) {
	const body = req.body
	const sql = "UPDATE todo SET done=? where id = ?"
	const params = [body.done, req.params.id]
	conn.query(sql, params, function(err, result) {
		if (err) console.log("error: " + err);
		else res.send(result);
	});
});

app.listen(5000, function() {
	console.log("Listing on localhost port 5000");
})
