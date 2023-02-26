import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormUser from '../../lib/form/user';
import { editUser } from '../../features/users-slice';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedUser = useSelector(state => {
    const idx = state.users.value.findIndex(({id}) => id === userId)
    return state.users.value[idx]
  })

  const cbSubmit = (newData) => {
    dispatch(editUser({
			newData,
      userId,
		}));
    
    navigate(-1)
  }

  return (
    <div>
			<FormUser selectedUser={selectedUser} cbSubmit={cbSubmit} />
		</div>
  );
}