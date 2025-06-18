
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axios from 'axios';

export default function Signup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const handleSignup = async ()=>{
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;

    // console.log(firstName+" "+lastName+ " "+userName+ " "+ password);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,{
      firstName,
      lastName,
      userName,
      password
    })
      localStorage.setItem("token",response.data.data.jwt)
      navigate('/');
    } catch (error) {
      alert("userName is already taken");
    }
    
    
  }
  return (
    <div className='min-h-screen w-screen bg-[#808080] flex justify-center items-center'>
        <div className='w-1/4 h-fit bg-white flex flex-col gap-3 p-6 rounded-md'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold'>Sign Up</h1>
                <p className=' p-3'>Enter Your Information to create an account</p>
            </div>
            <Input ref={firstNameRef} label="First Name" type="text" placeholder="Jhon"/>
            <Input ref={lastNameRef} label="Last Name" type="text" placeholder="Doe"/>
            <Input ref={userNameRef} label="Username" type="text" placeholder="DoeJhon#143"/>
            <Input ref={passwordRef} label="Password" type="password" placeholder="Enter Your Password"/>


            <Button onClick={handleSignup} text="Sign Up" className="mt-2 bg-black hover:text-black"/>

            <div className='text-[14px] text-center font-semibold'>Already have an account? <Link to={'/signin'} className='underline'>Login</Link></div>
        </div>

    </div>
  )
}
