import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BackendUrl } from "../../utils/Backendurl";
import {toast} from "react-hot-toast"

export const handleSignup = createAsyncThunk("fetch/signup", async(payload, {rejectWithValue})=>{
    try{

        const response = await fetch(`${BackendUrl}/user/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({payload})
        })
        const result = await response.json()
        if(response.status ==200){
            toast.success(result.success)
            return result;
        }else{
            toast.error(result.error)
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const handleSignin =createAsyncThunk("fetch/signin", async({email, password}, {rejectWithValue})=>{
    try{

        const response = await fetch(`${BackendUrl}/user/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
        const result = await response.json()
        if(response.status ==200){
            toast.success(result.message)
            localStorage.setItem("token", result.token)
            localStorage.setItem('user', JSON.stringify(result.user))
            return result;
        }else{
            toast.error(result.error)
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: JSON.parse(localStorage.getItem('user'))|| null,
        token: localStorage.getItem('token') || null,
        loading: false
    },
    reducers: {
        userAuthVerify: (state, action)=>{
            const token = localStorage.getItem('token')
            const user = JSON.parse(localStorage.getItem('user'))
            if(token && token.length > 0){
                state.isAuthenticated = true;
                state.token = localStorage.getItem('token') || null;
                state.user = user
            }            
        },
        userLogOut : (state)=>{
            const token = localStorage.getItem('token')
            if(token && token.length >0){
                toast.success("Log out")
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                state.user = null,
                state.isAuthenticated = false,
                state.token = null
            }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(handleSignup.pending, (state) =>{
            state.loading = true;
        })
        .addCase(handleSignup.rejected, (state) =>{
            state.loading = false;
        })
        .addCase(handleSignup.fulfilled, (state) =>{
            state.loading = false;
        })
        .addCase(handleSignin.pending, (state) =>{
            state.loading = true
        })
        .addCase(handleSignin.rejected, (state) =>{
            state.loading = false
        })
        .addCase(handleSignin.fulfilled, (state,action) =>{
            state.loading = false
            state.token = action.payload.token
            state.isAuthenticated = true
            state.user = action.payload.user
        })
    }
})

export const {userAuthVerify, userLogOut} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;