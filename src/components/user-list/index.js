import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { deleteUser } from '../../features/users-slice';
import Table from '../../lib/table';

function Action({ idx }) {
	const dispatch = useDispatch()
	
	const handleDelete = e => {
		e.preventDefault()
		dispatch(deleteUser({
			idx
		}))
	}

	return (
		<div>
			<Link to={`/edit-user/${idx}`}>
				<button>
					edit
				</button>
			</Link>
			<button onClick={handleDelete}>
				Delete
			</button>  
		</div>
	);
}

export default function UserList() {
	// get dataTable from global state
	let dataTable = useSelector(state => state.users.value)

	// declare headers table for react-table
	const headersTable = [
		{
			Header: 'Firstname',
			accessor: 'firstname',
		},
		{
			Header: 'Lastname',
			accessor: 'lastname',
		},
		{
			Header: 'Expired Date',
			accessor: 'expiredDate',
		},
		{
			Header: 'Group Access',
			accessor: 'groupAccess',
		},
		{
			Header: 'Action',
			accessor: 'action',
		},
	]

	dataTable = dataTable?.map((el, idx) => ({
		...el,
		// add action property for edit and delete
		action: <Action idx={idx} />
	}))

	return (
		<div>
			<Link to='/add-user'>
				<button> 
					Add User 
				</button>
			</Link>
			<Table headersTable={headersTable} dataTable={dataTable} />
		</div>
	);
}
