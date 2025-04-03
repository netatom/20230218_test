import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router"
import moment from "moment"
import Pagination from "./Pagenation"

const ListBoard = () => {
    const [boards, setBoardList] = useState([])
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    function getList(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setBoardList(data.boards)
                setTotalPages(data.totalPages)
            })
    }

    useEffect(() => {
        getList(`http://localhost:3000/api/board?page=${page}`)
    }, [page])

    const handleSearchUser = () => {
        console.log(`current page: ${page}`)
    }

    const setCurrentPageNumber = page => {
        setPage(page)
    }

    return (
        <div>
            <p>게시판</p>
            <Link to="/addBoard">
                <button className="btn btn-success">게시물 추가</button>
            </Link>
            <table className="table">

                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map(board => (
                        <tr key={board.board_id}>
                            <td>{board.board_id}</td>
                            <td>
                                <Link to={`/detailBoard/${board.board_id}`}>
                                    {board.subject}
                                </Link>
                            </td>
                            <td>{moment(board.created_at).format('YYYY-MM-DD')}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <Pagination
                totalPages={totalPages}
                handleSearchUser={handleSearchUser}
                setCurrentPageNumber={setCurrentPageNumber}
            />

        </div>
    );

}

export default ListBoard