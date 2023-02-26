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
			const userId = action.payload?.userId;
			const newData = action.payload?.newData;

			const idx = state.value.findIndex(({id}) => id === userId);

			if (idx > -1) {
				state.value[idx] = newData;
				
				return state;
			};
		},
		deleteUser: (state, action) => {
			const userId = action.payload?.userId;

			const idx = state.value.findIndex(({id}) => id === userId);

			if (idx > -1) {
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