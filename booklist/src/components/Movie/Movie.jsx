const Movie = ({ movie }) => {
    return (
        <div className="card">
            <img src={movie.pub_frontimage} alt="" className="card-img-top" />
            <div className="card-body">
                <h2 className="card-title">{movie.pub_title}</h2>
                <p className="card-text">{movie.pub_isbn}</p>
                <p className="card-text">{movie.pub_story}</p>
            </div>

        </div>
    )
}

export default Movie