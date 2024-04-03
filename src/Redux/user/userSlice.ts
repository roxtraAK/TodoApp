import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface User{
    user_id: number,
    firstname: string,
    lastname: string,
    email: string,
    phonenumber: string,
    username: string,
    password: string,
}

const initialState:User = {
    user_id: 0,
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    username: "",
    password: "",

} 

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            return action.payload;
        },
        getUserData: (state) => {
            return { user_id: state.user_id, firstname: state.firstname,lastname: state.lastname,email: state.email,phonenumber: state.phonenumber, username: state.username, password: state.password };
        },
    },
});
export const { updateUser, getUserData } = userSlice.actions;

export default userSlice.reducer;