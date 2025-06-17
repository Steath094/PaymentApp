
export default function ProfileImage({fullName}) {
    const initial = fullName.split(' ').map(name => name[0]).join('').toUpperCase();
  return (
    <div className="profileImage w-14 h-14 flex justify-center items-center">{initial}</div>
  )
}
