import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.png'

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  
  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.data?.token) {
      setUser(response.data.user)
      localStorage.setItem('token', response.data.token)
      navigate('/home')
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

            <p className='text-center text-sm text-gray-600 pt-1'>New here? <Link to='/signup' className='text-blue-600 font-medium hover:underline'>Create new Account</Link></p>
          </form>
        </div>
        
        <div className='mt-auto pb-6 pb-[env(safe-area-inset-bottom)]'>
          <Link
            to='/captain-login'
            className='bg-emerald-500 flex items-center justify-center text-white font-semibold rounded-xl px-4 py-3 w-full text-base hover:bg-emerald-600 transition-colors'
          >Sign in as Captain</Link>
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

              <p className='text-center text-sm text-gray-600 pt-2'>New here? <Link to='/signup' className='text-blue-600 font-medium hover:underline'>Create new Account</Link></p>
            </form>
            
            <div className='pt-6 mt-6 border-t border-gray-200'>
              <Link
                to='/captain-login'
                className='bg-emerald-500 flex items-center justify-center text-white font-semibold rounded-xl px-4 py-3 w-full text-base hover:bg-emerald-600 transition-colors'
              >Sign in as Captain</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin