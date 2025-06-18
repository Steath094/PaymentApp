import React, { useRef } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Signin() {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSignin = async ()=>{
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;

    // console.log(firstName+" "+lastName+ " "+userName+ " "+ password);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signin`,{
        userName,
        password
    })
    console.log(response);
      localStorage.setItem("token",response.data.data)
      navigate('/');
    } catch (error) {
      alert("Wrong username or password");
    }
    
    
  }
  return (
    <div className='h-screen w-screen bg-[#808080] flex justify-center items-center'>
        <div className='w-1/4 h-fit bg-white flex flex-col gap-3 p-6 rounded-md'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold'>Sign In</h1>
                <p className=' p-3'>Enter Your Information to create an account</p>
            </div>
            <Input ref={userNameRef} label="Username" type="text" placeholder="DoeJhon#143"/>
            <Input ref={passwordRef} label="Password" type="password" placeholder="Enter Your Password"/>


            <Button onClick={handleSignin} text="Sign In" className="mt-2 bg-black hover:text-black"/>

            <div className='text-[14px] text-center font-semibold'>Don't have an account? <Link to={'/signup'} className='underline'>Sign Up</Link></div>
        </div>

    </div>
  )
}
