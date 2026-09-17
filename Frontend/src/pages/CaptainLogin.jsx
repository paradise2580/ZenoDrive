import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import logo from '../assets/logo.png'

const Captainlogin = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data

      setCaptain(data.captain)
      localStorage.setItem('captainToken', data.token)
      localStorage.setItem('captain', JSON.stringify(data.captain));
      navigate('/captain-home')

    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Logo in corner */}
      <div className='absolute top-6 left-6 md:top-8 md:left-8'>
        <img className='w-16 md:w-20' src={logo} alt="" />
      </div>

      {/* Mobile Layout */}
      <div className='md:hidden h-[100dvh] flex flex-col p-6 pt-24'>
        <div>
          <form onSubmit={(e) => {
            submitHandler(e)
          }} className='space-y-5'>
            <div>
              <h3 className='text-lg font-semibold mb-2 text-gray-900'>What's your email</h3>
              <input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className='bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                type="email"
                placeholder='email@example.com'
              />
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2 text-gray-900'>Enter Password</h3>
              <input
                className='bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                required 
                type="password"
                placeholder='password'
              />
            </div>

            <button
              className='bg-black text-white font-semibold rounded-xl px-4 py-3 w-full text-base hover:bg-gray-800 transition-colors mt-2'
            >Login</button>

            <p className='text-center text-sm text-gray-600 pt-1'>Join a fleet? <Link to='/captain-signup' className='text-blue-600 font-medium hover:underline'>Register as a Captain</Link></p>
          </form>
        </div>
        
        <div className='mt-auto pb-6 pb-[env(safe-area-inset-bottom)]'>
          <Link
            to='/login'
            className='bg-orange-600 flex items-center justify-center text-white font-semibold rounded-xl px-4 py-3 w-full text-base hover:bg-orange-700 transition-colors'
          >Sign in as User</Link>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden md:flex min-h-screen items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          <div className='bg-white rounded-2xl border border-gray-200 shadow-lg p-10'>
            <form onSubmit={(e) => {
              submitHandler(e)
            }} className='space-y-6'>
              <div>
                <h3 className='text-base font-semibold mb-2 text-gray-900'>What's your email</h3>
                <input
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  className='bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                  type="email"
                  placeholder='email@example.com'
                />
              </div>

              <div>
                <h3 className='text-base font-semibold mb-2 text-gray-900'>Enter Password</h3>
                <input
                  className='bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  required 
                  type="password"
                  placeholder='password'
                />
              </div>

              <button
                className='bg-black text-white font-semibold rounded-xl px-4 py-3.5 w-full text-base hover:bg-gray-800 transition-colors mt-2'
              >Login</button>

              <p className='text-center text-sm text-gray-600 pt-2'>Join a fleet? <Link to='/captain-signup' className='text-blue-600 font-medium hover:underline'>Register as a Captain</Link></p>
            </form>
            
            <div className='pt-6 mt-6 border-t border-gray-200'>
              <Link
                to='/login'
                className='bg-orange-600 flex items-center justify-center text-white font-semibold rounded-xl px-4 py-3 w-full text-base hover:bg-orange-700 transition-colors'
              >Sign in as User</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Captainlogin