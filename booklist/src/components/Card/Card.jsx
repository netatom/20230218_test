const Card = ({ book }) => {
    return (
        <div className="card">
            <img src={book.pub_frontimage} alt="" className="card-img-top" />
            <div className="card-body">
                <h2 className="card-title">{`${book.pub_title}(${book.pub_year})`}</h2>
                <p className="card-text">isbn{book.pub_isbn}</p>
                <p className="card-text">{`isbn:${book.pub_isbn}`}</p>
            </div>

        </div>
    )
}

export default Card