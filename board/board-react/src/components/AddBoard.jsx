import { useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"

const AddBoard = () => {
    const [subject, setSubject] = useState("")
    const [board_body, setBody] = useState("")
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const addBoard = (data) => {

        const form = new FormData();
        form.append('subject', data.subject)
        form.append('board_body', data.board_body)

        fetch('http://localhost:3000/api/board/create', {
            method: 'POST',
            body: form
        }).then(() => navigate('/'))
    }

    return (
        <div>
            <p>게시물 추가</p>
            <form onSubmit={handleSubmit(addBoard)}>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">제목</label>
                    <input type="text" name="subject" id="subject" className="form-control"
                        {...register("subject", {
                            required: "제목 필수 입니다"
                        })}
                        onChange={e => setSubject(e.target.value)} />
                    {errors.subject && <span className="danger">{errors.subject.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="board_body" className="form-label">내용</label>
                    <textarea rows="6" name="board_body" id="board_body" className="form-control"
                        {...register("board_body", {
                            required: "내용 필수 입니다",
                            minLength: { value: 10, message: "내용은 10자이상 입력입니다." }
                        })}
                        onChange={e => setBody(e.target.value)}></textarea>
                    {errors.board_body && <span className="danger">{errors.board_body.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary">추가</button>
            </form>
        </div>
    )
}

export default AddBoard
