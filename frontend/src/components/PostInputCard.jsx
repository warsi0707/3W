import { useState } from "react"
import { useDispatch } from "react-redux"
import { handlePosts } from "../redux/slice/postSlice"

export default function PostInputCard(){
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [image, setImage] = useState("")

    const handlePost =()=>{
        dispatch(handlePosts({title, text, image}))
    }

    return (
        <div className="w-full flex flex-col gap-5   bg-slate-200 p-5 rounded-xl">
            <h1 className="text-3xl">Create Post</h1>
            <div className="w-full flex flex-col gap-2">
                <input value={title} onChange={(e)=> setTitle(e.target.value)} type="text" placeholder="Title" className="w-full border p-2 rounded-md outline-none border-slate-400" />
                <textarea value={text} onChange={(e)=> setText(e.target.value)} name="" className="border border-slate-400 w-full rounded-md outline-none p-2" placeholder="What's on your mind?" rows={5} id=""></textarea>
                <input value={image} onChange={(e)=> setImage(e.target.value)} type="text" placeholder="Image link" className="w-full border p-2 rounded-md outline-none border-slate-400" />
            </div>
            <div className="flex justify-end">
                <button onClick={handlePost} className="border p-2 px-5 rounded-md cursor-pointer hover:bg-gray-400"><i className="fa-regular fa-paper-plane"></i> Post</button>
            </div>
        </div>
    )
}