import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

const Pagination = ({ onChangePage }) => {
   return (
      <ReactPaginate
         className={styles.root}
         breakLabel="..."
         nextLabel=" >"
         previousLabel="< "
         onPageChange={(e) => onChangePage(e.selected + 1)}
         pageRangeDisplayed={5}
         pageCount={3}
         renderOnZeroPageCount={null}
      />
   );
};

export default Pagination;
