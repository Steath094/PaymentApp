
export default function Button({text, className,onClick}) {
  return (
    <button onClick={onClick} className={`text-white hover:bg-white hover:outline-2 cursor-pointer p-2 rounded-md ${className}`}>{text}</button>
  )
}
