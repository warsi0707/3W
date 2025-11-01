import { memo, useState } from "react"

 function PasswordInput({values, onchange}){
    const [showPassword, setShowpassword] = useState(false)
    return (
        <div className="w-full flex gap-2 flex-col">
            <label htmlFor="">Password</label>
            <div className="w-full flex items-center gap-1 px-2 border rounded-md">
                <input value={values} onChange={onchange} type={showPassword? "text": "password"}  className=" w-full p-2 outline-none"/>
                <button onClick={()=> setShowpassword(!showPassword)} className="cursor-pointer">{showPassword?<i className="fa-solid fa-eye-slash"></i>:<i className="fa-solid fa-eye"></i>}</button>
            </div>
        </div>
    )
}
export default memo(PasswordInput)