const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const db = require("./config/mysql.js");
const app = express();
const conn = db.init();
// Multer 설정(메모리에 파일 저장)
const upload = multer({ storage: multer.memoryStorage() });
app.use(express.urlencoded({ extended: true }));
// cors를 전체로 허용
app.use(cors())

app.get("/", (req, res) => {
    res.send("api is running!");
})

app.post("/api/board/create", upload.none(), (req, res) => {
    const body = req.body;
	const sql = "INSERT INTO `board` (`subject`, `board_body`) VALUES (?,?);";
	const params = [body.subject, body.board_body]
	conn.query(sql, params, err => {
		if (err) {
			console.log("query error!!", err);
		} else {
			res.sendStatus(200);
		}
	})

})

app.post("/api/board/update/:bnum", upload.none(), function(req, res) {
	
	const body = req.body;
	const bnum = req.params.bnum;
	const sqlBoard = "UPDATE `board` SET `subject`=?, `board_body`=? WHERE `board_id`=?;";
	const boardParams = [body.subject, body.board_body, bnum];
	conn.query(sqlBoard, boardParams, (err) => {
		if (err) {
			console.log("보드 업데이트 오류 (파일 없음):", err);
			return res.sendStatus(500);
		}
		res.sendStatus(200);
	});
	
})

// read all boards
app.get("/api/board", (req, res) => {
	const page = parseInt(req.query.page) || 1
	const pageSize = 10
	const offset = (page-1) * pageSize

	const sql0 = "select count(*) as total from board"
	conn.query(sql0, (err, result) => {
		const [countRows] = result
		const total = countRows.total
		console.log('total:', total)
		const totalPages = Math.ceil(total / pageSize)

		const sql = "select * from board order by created_at desc limit ?, ?";
		const param = [offset, pageSize]
		conn.query(sql, param, (err, result) => {
			if (err) {
				console.log("query error!!", err)
			} else {
				//const boards = result
				res.json({
					page, 
					pageSize,
					total,
					totalPages,
					boards: result
				})
			}
		})
	})

})

// read single boards
app.get("/api/read/:bnum", (req, res) => {
    const sql = "select * from board where board_id=" + req.params.bnum;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log("query error!!", err);
        } else {
            res.send(result);
        }
    })
})

app.post("/api/delete/:bnum", (req, res) => {
    const bnum = req.params.bnum;
    
    // 먼저 해당 게시글 정보를 가져온다
    const selectSql = "SELECT * FROM board WHERE board_id = ?";
    conn.query(selectSql, [bnum], (err, result) => {
        if (err) {
            console.error("select query error:", err);
            res.status(500).send("DB Error");
            return;
        }

        const board = result[0];
        if (!board) {
            res.status(404).send("Board not found");
            return;
        }

		const deleteBoardSql = "DELETE FROM board WHERE board_id = ?";
		conn.query(deleteBoardSql, [bnum], err => {
			if (err) {
				console.error("board delete error:", err);
				res.status(500).send("Board delete error");
			} else {
				res.send("Deleted board only");
			}
		});

    });
});


app.listen(3000, () => {
    console.log("start node 3000!");
})