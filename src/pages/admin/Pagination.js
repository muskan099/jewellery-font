import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({ totalNft, nftPerPage, nft, getData, limit }) {
  const handlePageClick = (data) => {
    const pageClicked = data.selected + 1;

    getData(pageClicked, limit);
    console.log({ pageClicked });
    console.log({ totalNft });
    console.log({ nftPerPage });
  };
  return (
    <div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={totalNft / nftPerPage}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
    </div>
  );
}

export default Pagination;
