import React from 'react';

export default function Pagination({ 
	activePage, 
	count, 
	rowsPerPage, 
	totalPages, 
	setActivePage }) {
	
	const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
	const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;
  
	const handleFirstPage = () => {
		setActivePage(1);
	};

	const handlePrevPage = () => {
		setActivePage(activePage - 1);
	};

	const handleNextPage = () => {
		setActivePage(activePage + 1);
	};

	const handleLastPage = () => {
		setActivePage(totalPages);
	};

	return (
		<>
      <div className="">
        <button disabled={activePage === 1} onClick={handleFirstPage}>
					{'<< First'}
        </button>
        <button disabled={activePage === 1} onClick={handlePrevPage}>
					{'< Previous'}
        </button>
        <button disabled={activePage === totalPages} onClick={handleNextPage}>
					{'Next >'}
        </button>
        <button disabled={activePage === totalPages} onClick={handleLastPage}>
					{'Last >>'}
        </button>
      </div>
      <p>
        Page {activePage} of {totalPages}
      </p>
      <p>
        Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p>
    </>
  );
}
