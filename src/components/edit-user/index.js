import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormUser from '../../lib/form/user';
import { editUser } from '../../features/users-slice';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
  const { idx } = useParams()
  const navigate = useNavigate()
  const selectedUser = useSelector(state => state.users.value[idx])
  const dispatch = useDispatch();

  const cbSubmit = (user) => {
    dispatch(editUser({
			user,
      idx,
		}));
    
    navigate(-1)
  }

  return (
    <div>
			<FormUser selectedUser={selectedUser} cbSubmit={cbSubmit} />
		</div>
  );
}