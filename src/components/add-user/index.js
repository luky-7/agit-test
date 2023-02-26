import React from 'react';
import { useDispatch } from 'react-redux';
import FormUser from '../../lib/form/user';
import { addUser } from '../../features/users-slice';
import { useNavigate } from 'react-router-dom';

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cbSubmit = (user) => {
    dispatch(addUser({
			user,
		}));
    navigate(-1)
  }

  return (
    <div>
			<FormUser cbSubmit={cbSubmit} />
		</div>
  );
}