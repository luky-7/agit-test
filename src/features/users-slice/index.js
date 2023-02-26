import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: []
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state, action) => {
			const user = action.payload?.user;
			state.value = [
				...state.value,
				user,
			];

			return state;
		},
		editUser: (state, action) => {
			const idx = action.payload?.idx;
			const user = action.payload?.user;

			if (state.value[idx] !== undefined) {
				state.value[idx] = user
				return state;
			};
		},
		deleteUser: (state, action) => {
			const idx = action.payload?.idx;

			if (state.value[idx] !== undefined) {
				state.value.splice(idx, 1);
			
				return state;
			};			
		},
	},
}); 

// actions for dispatch
export const { addUser, editUser, deleteUser } = usersSlice.actions;

// reducers for configureStore
export default usersSlice.reducer;