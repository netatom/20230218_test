import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams, useNavigate } from "react-router"

const EditBoard = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm()

    const [board, setBoard] = useState({})
    const params = useParams()
    const navigate = useNavigate()

    function requestFetchBoard() {
        fetch(`http://localhost:3000/api/read/${params.id}`)
            .then(response => response.json())
            .then(result => {
                setBoard(result[0])
            })
    }

    useEffect(() => {
        requestFetchBoard()
    }, [])

    useEffect(() => {
        setValue("subject", board.subject)
        setValue("board_body", board.board_body)
    }, [board])

    const submitForm = (data) => {
        const formData = new FormData()
        const subject = data.subject
        const body = data.board_body
        formData.append("subject", subject)
        formData.append("board_body", body)

        fetch(`http://localhost:3000/api/board/update/${params.id}`, {
            method: "POST",
            body: formData
        }).then(response => {
            if (response.ok) {
                alert("update success")
                navigate(`/detailBoard/${params.id}`)
            }
        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitForm)}>
                <h1>EditBoard입니다.</h1>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">제목</label>
                    <input type="text" name="subject" id="subject"
                        className="form-control"
                        {...register("subject", {
                            required: "제목 필수 입니다"
                        })} />
                    {errors.subject && <span className="danger">{errors.subject.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="board_body" className="form-label">내용</label>
                    <textarea rows="6" name="board_body" id="board_body"
                        className="form-control"
                        {...register("board_body", {
                            required: "내용 필수 입니다",
                            minLength: { value: 10, message: "내용은 10자이상 입력입니다." }
                        })}
                    ></textarea>
                    {errors.board_body && <span className="danger">{errors.board_body.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>수정</button>
            </form>
        </div>
    )
}



export default EditBoard