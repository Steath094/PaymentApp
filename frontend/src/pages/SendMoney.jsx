import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import ProfileImage from '../components/ProfileImage'

export default function SendMoney() {
  return (
     <div className='h-screen w-screen bg-[#808080] flex justify-center items-center'>
        <div className='w-1/4 h-fit bg-white flex flex-col gap-3 p-6 rounded-md'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold'>Send Money</h1>
            </div>

            <div className='flex items-center gap-4 mt-8'>
              <ProfileImage fullName="Friend's Name" variant='Secondary'/>
              <h1 className='text-2xl font-semibold'>Friend's Name</h1>
            </div>
            <Input label="Amount (in Rs)" type="number" placeholder="Enter Amount" className=''/>

            <Button text="Initiate Transfer" className="mt-2 bg-[#22c45e] hover:text-[#22c45e] "/>
        </div>

    </div>
  )
}
