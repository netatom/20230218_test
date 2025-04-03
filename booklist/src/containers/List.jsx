import Card from "../components/Card/Card"
import { useState, useEffect } from "react"

const List = () => {

    const [data, setData] = useState([])
    const [loading, setLoadong] = useState(true)

    useEffect(() => {
        async function fetchData() {
            // const books = await fetch('./data.json')
            // const books = await fetch('http://localhost:5173/data.json')
            const books = await fetch('/api/pubs10')
            const bookJson = await books.json()
            setData(bookJson)
            setLoadong(false)
        }
        fetchData()
    }, []) // 최초 1회만 실행됨

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="row">
            {data.map(book => (
                <div className="col-sm-2" key={book.pub_id}>
                    <Card book={book} />
                </div>

            ))}
        </div>

    )
}

export default List