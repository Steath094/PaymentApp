import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

export default function Signin() {
  return (
    <div className='h-screen w-screen bg-[#808080] flex justify-center items-center'>
        <div className='w-1/4 h-fit bg-white flex flex-col gap-3 p-6 rounded-md'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold'>Sign In</h1>
                <p className=' p-3'>Enter Your Information to create an account</p>
            </div>
            <Input label="Username" type="text" placeholder="DoeJhon#143"/>
            <Input label="Password" type="password" placeholder="Enter Your Password"/>


            <Button text="Sign In" className="mt-2"/>

            <div className='text-[14px] text-center font-semibold'>Don't have an account? <Link to={'/signup'} className='underline'>Sign Up</Link></div>
        </div>

    </div>
  )
}
