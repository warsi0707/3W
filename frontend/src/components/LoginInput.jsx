import { memo } from "react";

function LoginInput({values, onchange, label,type, placeholder}) {
  return (
    <div className="w-full flex gap-2 flex-col">
      <label htmlFor="">{label}</label>
      <input
      value={values}
      onChange={onchange}
        type={type}
        placeholder={placeholder}
        className="border p-2 rounded-md"
      />
    </div>
  );
}
export default memo(LoginInput)