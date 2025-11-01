import { useEffect, useState } from "react";
import { Link } from "react-router";
import HambergMenu from "./HambergMenu";
import { useDispatch } from "react-redux";
import { userAuthVerify } from "../redux/slice/authSlice";


export default function Navbar() {
  const dispatch = useDispatch()
  const [hamberg, setHamberg] = useState(false);
  

  useEffect(()=>{
    dispatch(userAuthVerify())
  },[])
  return (
    <>
      <div className="shadow-xl fixed w-full p-3 px-5 lg:px-20 flex justify-between items-center z-50 bg-white text-black">
        <Link to={"/"} className=" text-2xl ">
          Social
        </Link>
        <button onClick={()=> setHamberg(!hamberg)} className="cursor-pointer" title="Profile">
          <img src="/logo.png" className="w-12 h-12 rounded-full" alt="" />
        </button>
      </div>
      {hamberg && 
      <HambergMenu/>
      }
    </>
  );
}
