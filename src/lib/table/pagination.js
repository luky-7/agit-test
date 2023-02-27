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
		<div className='text-end mt-5'>
      <div className="inline-block">
        <button className='bg-white hover:bg-gray-100 text-gray-800 font-normal ml-1 py-0 px-2 border border-gray-400 rounded shadow' 
						disabled={activePage === 1} onClick={handleFirstPage}>
					{'<< First'}
        </button>
        <button className='bg-white hover:bg-gray-100 text-gray-800 font-normal ml-1 py-0 px-2 border border-gray-400 rounded shadow' 
				disabled={activePage === 1} onClick={handlePrevPage}>
					{'< Previous'}
        </button>
        <button className='bg-white hover:bg-gray-100 text-gray-800 font-normal ml-1 py-0 px-2 border border-gray-400 rounded shadow' 
				disabled={activePage === totalPages} onClick={handleNextPage}>
					{'Next >'}
        </button>
        <button className='bg-white hover:bg-gray-100 text-gray-800 font-normal ml-1 py-0 px-2 border border-gray-400 rounded shadow' 
				disabled={activePage === totalPages} onClick={handleLastPage}>
					{'Last >>'}
        </button>
      </div>
      <p className='text-sm'>
        Page {activePage} of {totalPages}
      </p>
      <p className='text-sm'>
        Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p>
    </div>
  );
}
