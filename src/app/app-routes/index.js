import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from '../../components/user-list';
import AddUser from '../../components/add-user';
import EditUser from '../../components/edit-user'
import Home from './home';

export default function AppRoutes() {
  return (
		<BrowserRouter>
			<Routes>
				<Route path='' element={<Home />} />
				<Route path='/' element={<Home />} />
				<Route path='users/' element={<UserList />} />
				<Route path='add-user' element={<AddUser />} />
				<Route path='edit-user/:userId' element={<EditUser />} />
			</Routes>
		</BrowserRouter>
  );
}
