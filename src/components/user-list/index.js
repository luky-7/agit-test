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
		<div>
			<Link to='/add-user'>
				<button> 
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
	);
}
