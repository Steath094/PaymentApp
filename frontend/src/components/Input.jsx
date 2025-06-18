
export default function Input({label,type,ref,placeholder,className}) {
  return (
    <div className="flex flex-col gap-2 ">
        <label htmlFor="" className="font-semibold">{label}</label>
        <input className={`outline-1 outline-gray-300 p-2 rounded-md focus:outline-gray-900 focus:outline-2 ${className}`} ref={ref} type={type} placeholder={placeholder} />
    </div>
  )
}
