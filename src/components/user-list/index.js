import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { deleteUser } from '../../features/users-slice';
import Table from '../../lib/table';

function ActionHeaders() {
	return (
		<>
			Actions
		</>
	);
}

function ActionColumns({ userId }) {
	const dispatch = useDispatch()
	
	const handleDelete = e => {
		e.preventDefault()
		dispatch(deleteUser({
			userId
		}))
	}

	return (
		<>
			<Link to={`/edit-user/${userId}`}>
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold my-3 py-1 px-4 rounded'>
					Edit
				</button>
			</Link>
			<button className='bg-red-500 hover:bg-red-700 text-white font-bold my-3 ml-1 py-1 px-4 rounded' 
				onClick={handleDelete}>
				Delete
			</button>  
		</>
	);
}

export default function UserList() {
	// get dataTable from global state
	const dataTable = useSelector(state => state.users.value)

	// declare headers table
	const headersTable = [
		{
			label: 'Firstname',
			accessor: 'firstname',
		},
		{
			label: 'Lastname',
			accessor: 'lastname',
		},
		{
			label: 'Group Access',
			accessor: 'groupAccess',
		}
	]

	return (
		<div className='h-screen'>
			<div className='rounded overflow-hidden shadow-md py-3 px-10 mx-auto mt-7'>
				<div className='py-2'>
					<h1 className="text-2xl ml-7">
						User List
					</h1>
				</div>
				<div className='mb-2'>
					<Link to='/add-user'>
						<button 
							className='float-right bg-blue-500 hover:bg-blue-700 text-white font-bold my-3 py-1 px-4 rounded'> 
							Add User 
						</button>
					</Link>
					<Table 
						headersTable={headersTable} 
						dataTable={dataTable} 
						rowsPerPage={2}
						additionalHeader={() => <ActionHeaders />}
						additionalColumn={(userId) => <ActionColumns userId={userId} />} />
				</div>
			</div>
		</div>
	);
}
