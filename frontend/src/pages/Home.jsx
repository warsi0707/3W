import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import PostInputCard from "../components/PostInputCard";
import { useCallback, useEffect, useState } from "react";
import { handleGetPosts, handleLike } from "../redux/slice/postSlice";

export default function Home(){
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.posts)
    const [like, setLike] = useState(1)

    const handleLikePost =useCallback((id)=>{
        dispatch(handleLike({id,like}))
    },[])
    useEffect(()=>{
        dispatch(handleGetPosts())
    },[dispatch])
    return (
        <div className="min-h-screen w-full p-4 py-32 lg:px-40 flex flex-col gap-5">
            <PostInputCard/>
            <div className="flex flex-wrap justify-between gap-5">
                {posts.map((post)=> (
                     <Card key={post._id} post={post} handleLikePost={()=> handleLikePost(post._id)}/>
                ))}
            </div>
        </div>
    )
}