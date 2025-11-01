import { Link, useNavigate } from "react-router";
import LoginInput from "../components/LoginInput";
import {useDispatch} from "react-redux"
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { handleSignin } from "../redux/slice/authSlice";

export default function Signin(){
    const dispatch = useDispatch()
    const [email, setEmail]=useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
      const goBack =()=>{
        window.history.back()
      }

    const handleSigninBtn =()=>{
        dispatch(handleSignin({email, password}))
        navigate("/")
    }
    return (
        <div className=" w-full min-h-screen flex flex-col gap-5 py-32 px-10 md:p-32">
            <button onClick={goBack} className="flex  items-center gap-1 cursor-pointer"><i className="fa-solid fa-arrow-left"></i> <p>back</p></button>
            <div className="flex justify-between w-full">
                <div className="w-full min-h-screen p-10 hidden lg:flex">
                <img src="/log.png" className="w-96 h-96" alt="" />
            </div>
            <div className="w-full h-full mt-10 flex flex-col gap-5 bg-slate-100 rounded-md p-5">
                <h1 className="text-2xl">Signin</h1>
                <div className="w-full flex flex-col gap-2  ">
                    <LoginInput values={email} onchange={(e)=> setEmail(e.target.value)} label={"Email"} placeholder={"user@gmail.com"} type={'text'}/>
                    <PasswordInput values={password} onchange={(e)=> setPassword(e.target.value)}/>
                </div>
                <div>
                    <div>Haven't an account? <Link to={"/signup"} className="underline hover:text-blue-500">Register</Link></div>
                </div>
                <button onClick={handleSigninBtn} className="w-full bg-red-400 p-2 text-white rounded-md cursor-pointer">Signin</button>
            </div>
            </div>
        </div>
    )
}