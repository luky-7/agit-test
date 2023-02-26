import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users-slice';

export default configureStore({
	reducer: {
		users: usersReducer
	},
	// disable Redux devTools in production
	devTools: process.env.NODE_ENV !== 'production',
});