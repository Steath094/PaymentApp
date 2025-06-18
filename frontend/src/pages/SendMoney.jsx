import React, { useRef } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import ProfileImage from '../components/ProfileImage'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const fullName = searchParams.get("name").replace("%20"," ");
  const amountRef = useRef();
  const navigate = useNavigate();
  const handleTransfer = async () =>{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/account/transfer`,
      {
        to: id,
        amount: amountRef.current.value
      },
      {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(response);
    
    if (response.data.success) {
      alert("Transfer Successfull");
      navigate('/')
    }
  }
  return (
     <div className='h-screen w-screen bg-[#808080] flex justify-center items-center'>
        <div className='w-1/4 h-fit bg-white flex flex-col gap-3 p-6 rounded-md'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold'>Send Money</h1>
            </div>

            <div className='flex items-center gap-4 mt-8'>
              <ProfileImage fullName={fullName} variant='Secondary'/>
              <h1 className='text-2xl font-semibold'>{fullName}</h1>
            </div>
            <Input ref={amountRef} label="Amount (in Rs)" type="number" placeholder="Enter Amount" className=''/>

            <Button onClick={handleTransfer} text="Initiate Transfer" className="mt-2 bg-[#22c45e] hover:text-[#22c45e] "/>
        </div>

    </div>
  )
}
