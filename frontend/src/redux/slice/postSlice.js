import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BackendUrl } from "../../utils/Backendurl";
import {toast} from "react-hot-toast"

export const handleGetPosts = createAsyncThunk("fetch/posts", async(payload, {rejectWithValue})=>{
    try{

        const response = await fetch(`${BackendUrl}/post`)
        const result = await response.json()
        if(response.status ==200){
            return result;
        }else{
            toast.error(result.error)
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const handlePosts =createAsyncThunk("fetch/uploadPosts", async({title, text, image}, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/post`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem('token')
            },
            body: JSON.stringify({title, text,image})
        })
        const result = await response.json()
        if(response.status ==200){
            toast.success(result.message)
            return result;
        }else{
            toast.error(result.error)
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const handleLike = createAsyncThunk("fetch/handleLike", async({id,like}, {rejectWithValue})=>{
     try{
        const response = await fetch(`${BackendUrl}/post/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem('token')
            },
            body: JSON.stringify({like})
        })
        const result = await response.json()
        if(response.status ==200){
            toast.success(result.message)
            return result;
        }else{
            toast.error(result.error)
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const handleDeletePost =createAsyncThunk("fetch/deletePost", async({id}, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BackendUrl}/post/${id}`, {
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token')
            }
        })
        const result = await response.json()
        if(response.status ==200){
            toast.success(result.message)
            return result;
        }else{
            toast.error(result.error)
            return rejectWithValue(result)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
const postSlice = createSlice({
    name: 'posts',
    initialState: {
        loading: false,
        posts: []
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(handleGetPosts.pending, (state) =>{
            state.loading = true;
        })
        .addCase(handleGetPosts.rejected, (state) =>{
            state.loading = false;
        })
        .addCase(handleGetPosts.fulfilled, (state,action) =>{
            state.loading = false;
            state.posts = action.payload.posts
        })
        .addCase(handlePosts.pending, (state)=>{
            state.loading = true
        })
        .addCase(handlePosts.fulfilled, (state, action)=>{
            state.loading = false
            state.posts.push(action.payload.post)
        })
        .addCase(handleLike.pending, (state)=>{
            state.loading = true
        })
        .addCase(handleLike.fulfilled, (state, action)=>{
            state.loading = false
            state.posts.find((post)=> {
                if(post._id === action.payload.post._id){
                    post.totalLikes = action.payload.post.totalLikes
                }
            })
        })
        .addCase(handleDeletePost.fulfilled, (state,action) =>{
            state.loading = false;
            (action.payload)
            state.posts = state.posts.filter((post)=> post._id !== action.payload.post._id)
        })
        .addCase(handleDeletePost.pending, (state)=>{
            state.loading = true
        })
    }
})

const postRedcuer = postSlice.reducer;
export default postRedcuer;