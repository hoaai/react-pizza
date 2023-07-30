import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
	currentPage:number;
	onChangePage:(page:number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
   return (
      <ReactPaginate
         className={styles.root}
         breakLabel="..."
         nextLabel=" >"
         previousLabel="< "
         onPageChange={(e) => onChangePage(e.selected + 1)}
         pageRangeDisplayed={4}
         pageCount={3}
         forcePage={currentPage - 1}
         // renderOnZeroPageCount={null}
      />
   );
};

export default Pagination;
