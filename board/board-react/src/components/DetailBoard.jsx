import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"

const DetailBoard = () => {
    const { id } = useParams()
    const [board, setBoard] = useState([])
    const navigate = useNavigate()

    function getboard(url) {
        fetch(url).then(response => response.json())
            .then(data => {
                setBoard(data[0])
            })
    }

    useEffect(() => {
        getboard(`http://localhost:3000/api/read/${id}`)
    }, [])

    return (
        <div>
            <p>게시물 상세</p>
            <h1>제목: {board.subject}</h1>
            <h1>내용: {board.board_body}</h1>
            <Link to={`/editBoard/${board.board_id}`}>
                <button className="btn btn-primary">수정</button>
            </Link>
            <Link to={`/deleteBoard/${board.board_id}`}>
                <button className="btn btn-danger">삭제</button>
            </Link>
        </div>
    )
}

export default DetailBoard
