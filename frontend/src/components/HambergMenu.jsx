import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { userLogOut } from "../redux/slice/authSlice";

export default function HambergMenu() {
    const userAuth = useSelector(state => state.auth)
    const dispatch = useDispatch()

  const handleSignOut =()=>{
    dispatch(userLogOut())
  }
  return (
    <div className="py-2 w-72 bg-white shadow-2xl border border-gray-300 fixed top-20 right-10 p-3 rounded-md">
      {userAuth && userAuth?.isAuthenticated == true?
      <div>
        <div className="flex gap-2 border-b p-2 items-center">
        <p>
          <i className="fa-solid fa-user"></i>
        </p>
        <p className="text-xl">{userAuth?.user?.username}</p>
      </div>
      <div className="flex gap-2 border-b p-2 items-center">
        <p>
          <i className="fa-solid fa-envelope"></i>
        </p>
        <p className="text-xl">{userAuth?.user?.email}</p>
      </div>
      <button onClick={handleSignOut} className="flex gap-2 cursor-pointer items-center p-2">
        <p>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </p>
        <p className="text-xl">Logout</p>
      </button>
      </div>:
      <div>
        <Link to={"/signup"} className="flex gap-2 cursor-pointer items-center p-2">
           <i className="fa-solid fa-user-plus"></i>
            <p className="text-xl">Signup</p>
        </Link>
        <Link to={"/signin"} className="flex gap-2 cursor-pointer items-center p-2">
            <i className="fa-regular fa-user"></i>
            <p className="text-xl">Signin</p>
        </Link>
      </div>}
    </div>
  );
}
