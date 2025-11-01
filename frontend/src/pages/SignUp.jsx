import { Link } from "react-router";
import LoginInput from "../components/LoginInput";

export default function SignUp() {
     const goBack =()=>{
        window.history.back()
      }
    return (
        <div className=" w-full min-h-screen flex flex-col gap-5 py-32 px-10 md:p-32">
            <button onClick={goBack} className="flex  items-center gap-1 cursor-pointer"><i className="fa-solid fa-arrow-left"></i> <p>back</p></button>
            <div className="flex justify-between w-full">
                <div className="w-full min-h-screen p-10 hidden lg:flex">
                <img src="/log.png" className="w-96 h-96" alt="" />
            </div>
            <div className="w-full h-full mt-10 flex flex-col gap-5 bg-slate-100 rounded-md p-5">
                <h1 className="text-2xl">Create a new account</h1>
                <div className="w-full flex flex-col gap-2  ">
                    <LoginInput/>
                    <LoginInput/>
                    <LoginInput/>
                </div>
                <div>
                    <div>Already have an account? <Link to={"/signin"} className="underline hover:text-blue-500">Singin</Link></div>
                </div>
                <button className="w-full bg-red-400 p-2 text-white rounded-md cursor-pointer">Signup</button>
            </div>
            </div>
        </div>
    )
}