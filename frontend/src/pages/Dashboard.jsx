import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import ProfileImage from '../components/ProfileImage'
import Button from '../components/Button'

function Dashboard() {
    const [users, setusers] = useState([{fullName: "User 1",id: 2}])
  return (
    <div className=''>
        <Navbar fullName="Sameer Khan"/>
        <div className='p-6 flex flex-col gap-4'>
            <div className='text-2xl font-medium'>Your Balance: $5000</div>
            <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-medium'>Users</h2>
                <Input type="text" placeholder="Search users..."></Input>
            </div>
            <div className='flex flex-col gap-2'>
                {users.map(user=>(
                    <div key={user.id} className='flex justify-between'>
                        <div className='flex justify-center items-center gap-2'>
                            <ProfileImage fullName={user.fullName}/>
                            <h2 className='text-2xl font-medium'>{user.fullName}</h2>
                        </div>
                        <Button text="Send Money" className="px-4 text-lg py-2"/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Dashboard