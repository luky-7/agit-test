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

function ActionColumns({ idx }) {
	const dispatch = useDispatch()
	
	const handleDelete = e => {
		e.preventDefault()
		dispatch(deleteUser({
			idx
		}))
	}

	return (
		<>
			<Link to={`/edit-user/${idx}`}>
				<button>
					edit
				</button>
			</Link>
			<button onClick={handleDelete}>
				Delete
			</button>  
		</>
	);
}

export default function UserList() {
	// get dataTable from global state
	const dataTable = useSelector(state => state.users.value)

	// declare headers table for react-table
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
		<div>
			<Link to='/add-user'>
				<button> 
					Add User 
				</button>
			</Link>
			<Table 
				headersTable={headersTable} 
				dataTable={dataTable} 
				rowsPerPage={3}
				actionHeaders={() => <ActionHeaders />}
				actionColumns={(idx) => <ActionColumns idx={idx} />} />
		</div>
	);
}
