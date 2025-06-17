
export default function Button({text, className}) {
  return (
    <button className={`bg-black text-white hover:text-black hover:bg-white hover:outline-2 cursor-pointer p-2 rounded-md ${className}`}>{text}</button>
  )
}
