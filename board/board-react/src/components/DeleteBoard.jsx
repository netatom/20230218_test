import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"

const BoardDelete = () => {
    const params = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:3000/api/delete/${params.id}`, {
                method: "POST"
            }).then(response => {
                if (response.ok) {
                    navigate("/")
                }
            }, [])
        })

    return (
        <p>보드 삭제입니다.</p>
    )
}

export default BoardDelete