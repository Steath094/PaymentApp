
export default function Input({label,type,ref,placeholder}) {
  return (
    <div className="flex flex-col gap-2 ">
        <label htmlFor="" className="font-semibold">{label}</label>
        <input className="outline-1 outline-gray-300 p-2 rounded-md focus:outline-gray-900 focus:outline-2" ref={ref} type={type} placeholder={placeholder} />
    </div>
  )
}
