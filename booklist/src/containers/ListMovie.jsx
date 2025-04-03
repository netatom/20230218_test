import Movie from "../components/Movie/Movie"
import { useState, useEffect } from "react"

const ListMovie = () => {

    const [data, setData] = useState([])
    const [loading, setLoadong] = useState(true)

    useEffect(() => {
        async function fetchData() {
            console.log("fetchData call");
            const books = await fetch('./note.json')
            const movieJson = await books.json()
            setData(movieJson)
            setLoadong(false)
        }
        fetchData()
    }, []) // 최초 1회만 실행됨

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="row">
            {data.map(movie => (
                <div className="col-sm-2" key={movie.pub_id}>
                    <Movie movie={movie} />
                </div>

            ))}
        </div>

    )
}

export default ListMovie