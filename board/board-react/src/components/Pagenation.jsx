import ReactPaginate from "react-paginate"

const Pagination = ({ totalPages, handleSearchUser, setCurrentPageNumber }) => {
    const last_display_size = 10
    const around_display_pages = 5

    const handlePaginate = selectedItem => {
        const page = selectedItem.selected + 1
        setCurrentPageNumber(page)
        handleSearchUser()
    }

    return (
        <div>
            <ReactPaginate
                pageCount={totalPages}
                marginPagesDisplayed={last_display_size}
                pageRangeDisplayed={around_display_pages}
                onPageChange={handlePaginate}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                activeLinkClassName="active"
                previousClassName="previous-link"
                nextLinkClassName="next-link"
                previousLabel="&lt;"
                nextLabel="&gt;"
                disabledClassName="disabled-button"
            />
        </div>
    )
}

export default Pagination