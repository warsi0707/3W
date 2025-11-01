import { memo, useState } from "react"
import { useDispatch } from "react-redux"
import { handleDeletePost } from "../redux/slice/postSlice"

function Card({post,handleLikePost}){
    const dispatch = useDispatch()
    const date = new Date(post.createdAt)

    const day = date.toLocaleDateString("en-IN")
    const month = date.toLocaleDateString("en-IN", {month: "short"})
    const time = date.toLocaleTimeString('en-IN',{hour: "numeric"})

    const handleDltPost =(id)=>{
        dispatch(handleDeletePost({id}))
    }
    
    return (
        <div className="h-auto w-full rounded-md md:w-80 flex flex-col gap-2 p-2 bg-slate-100 shadow-md">
            <div className="flex p-1 gap-2">
                <img src="/logo.png" className="w-12 h-12 rounded-full" alt="" />
                <div>
                    <div className="flex gap-2 items-center">
                        <p>{post.title}</p> 
                        <p className="text-sm">by {post.user.email}</p>
                    </div>
                    <p className="text-sm"> {month} {day.split("/").join(" ")} : {time} </p>
                </div>
            </div>
            <div className="w-full space-y-1">
                <p>{post.text}</p>
                {post?.image &&
                <img src="/logo.png" className="h-52 rounded-md w-full" alt="" />
                }
            </div>
            <div className="border-t border-gray-400 flex justify-between p-2">
                <button onClick={handleLikePost} className="cursor-pointer text-xl"><i className="fa-regular fa-heart"></i>{post.totalLikes}</button>
                <button onClick={()=>handleDltPost(post._id)} className="cursor-pointer"><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>
    )
}
export default memo(Card)