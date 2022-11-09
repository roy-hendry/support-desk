import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
	tickets: [],
	ticket: {},
	// These 4 could be replaced by a status variable but Brad prefers them seperate like this
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Create new ticket
export const createTicket = createAsyncThunk(
	"tickets/create",
	async (ticketData, thunkAPI) => {
		// The thunkAPI already has a lot of our information held inside it, this is the easiest way we can get our token
		const token = thunkAPI.getState().auth.user.token
		try {
			return await ticketService.createTicket(ticketData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
		.addCase(createTicket.pending, (state) => {
			state.isLoading = true
		})
		.addCase(createTicket.fulfilled, (state) => {
			state.isLoading = false
			state.isSuccess = true
		})
		.addCase(createTicket.rejected, (state, action) => {
			state.isLoading = false
			state.isError = true
			// If there is an error when creating the ticket above then the payload will contain that message
			state.message = action.payload
		})
	},
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
