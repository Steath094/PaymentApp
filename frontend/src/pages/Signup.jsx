
import Input from '../components/Input'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='h-screen w-screen bg-[#808080] flex justify-center items-center'>
        <div className='w-1/4 h-fit bg-white flex flex-col gap-3 p-6 rounded-md'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold'>Sign Up</h1>
                <p className=' p-3'>Enter Your Information to create an account</p>
            </div>
            <Input label="First Name" type="text" placeholder="Jhon"/>
            <Input label="Last Name" type="text" placeholder="Doe"/>
            <Input label="Username" type="text" placeholder="DoeJhon#143"/>
            <Input label="Password" type="password" placeholder="Enter Your Password"/>


            <Button text="Sign Up" className="mt-2 bg-black hover:text-black"/>

            <div className='text-[14px] text-center font-semibold'>Already have an account? <Link to={'/signin'} className='underline'>Login</Link></div>
        </div>

    </div>
  )
}
