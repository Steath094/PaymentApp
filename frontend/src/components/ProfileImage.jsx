
export default function ProfileImage({fullName,variant="Primary"}) {
    const initial = fullName.split(' ').map(name => name[0]).join('').toUpperCase();
    const bg = variant==="Primary" ? "bg-[#f5f5f5] text-black" : "bg-[#22c45e] text-white"
  return (
    <div className={`profileImage w-14 h-14 flex justify-center items-center ${bg}`}>{initial}</div>
  )
}
