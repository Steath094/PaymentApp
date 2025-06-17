import ProfileImage from "./ProfileImage";

export default function Navbar({fullName}) {
  return (
    <nav className="flex justify-between items-center p-4 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold">Payments App</h1>
        <div className="flex justify-center items-center gap-2">
            <h2 className="text-lg font-medium ">Hello, {fullName}</h2>
            <ProfileImage fullName={fullName}/>
        </div>
    </nav>
  )
}
