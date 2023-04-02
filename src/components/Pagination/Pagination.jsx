import ReactPaginate from "react-paginate";

export const Pagination = ({ page, setPage }) => {
  return (
    <>
      <ReactPaginate
        className="pagination justify-content-center my-5 gap-2"
        pageCount={Math.floor(page / 20)}
        previousLabel="Prev"
        nextLabel="Next"
        previousLinkClassName="btn btn-primary"
        nextLinkClassName="btn btn-primary"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        onPageChange={(data) => {
          setPage(data.selected + 1);
        }}
      />
    </>
  );
};