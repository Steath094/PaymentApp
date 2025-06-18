import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import ProfileImage from '../components/ProfileImage'
import Button from '../components/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const [users, setusers] = useState([])
    const [balance,setBalance] = useState(0)
    const [fullName,setFullName] = useState("User")
    const [filter,setFilter] = useState(" ")
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUserData = async() =>{
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/balance`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setBalance(res.data.data.balance);
            setFullName(res.data.data.userId.firstName+" "+res.data.data.userId.lastName);
        }
        const fetchUserList = async() =>{
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/bulk?filter=${filter}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setusers(res.data.data)
        }
      fetchUserData();
      fetchUserList();

    }, [])
    

  return (
    <div className=''>
        <Navbar fullName={fullName}/>
        <div className='p-6 flex flex-col gap-4'>
            <div className='text-2xl font-medium'>Your Balance: ${balance}</div>
            <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-medium'>Users</h2>
                <Input type="text" placeholder="Search users..."></Input>
            </div>
            <div className='flex flex-col gap-2'>
                {users.map(user=>(
                    <div key={user._id} className='flex justify-between'>
                        <div className='flex justify-center items-center gap-2'>
                            <ProfileImage fullName={user.firstName+" "+user.lastName}/>
                            <h2 className='text-2xl font-medium'>{user.firstName+" "+user.lastName}</h2>
                        </div>
                        <Button onClick={()=>{
                            navigate(`/send?id=${user._id}&name=${user.firstName+" "+user.lastName}`)
                        }} text="Send Money" className="px-4 text-lg py-2 bg-black hover:text-black"/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Dashboard