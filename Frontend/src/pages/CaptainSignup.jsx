import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.png'

const CaptainSignup = () => {

  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')


  const { captain, setCaptain } = React.useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('captainToken', data.token)

      localStorage.setItem('captain', JSON.stringify(data.captain));
      
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Logo in corner */}
      <div className='absolute top-6 left-6 md:top-8 md:left-8'>
        <img className='w-16 md:w-20' src={logo} alt="" />
      </div>

      {/* Mobile Layout */}
      <div className='md:hidden min-h-screen flex flex-col justify-between p-6 pt-24 pb-6'>
        <div className='overflow-y-auto flex-1'>
          <form onSubmit={(e) => {
            submitHandler(e)
          }} className='space-y-5'>
            <div>
              <h3 className='text-lg font-semibold mb-2 text-gray-900'>What's our Captain's name</h3>
              <div className='flex gap-3'>
                <input
                  required
                  className='bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                  type="text"
                  placeholder='First name'
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                />
                <input
                  required
                  className='bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                  type="text"
                  placeholder='Last name'
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                />
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2 text-gray-900'>What's our Captain's email</h3>
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

            <div>
              <h3 className='text-lg font-semibold mb-2 text-gray-900'>Vehicle Information</h3>
              <div className='flex gap-3 mb-3'>
                <input
                  required
                  className='bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                  type="text"
                  placeholder='Vehicle Color'
                  value={vehicleColor}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/[0-9]/g, '');
                    setVehicleColor(newValue);
                  }}
                />
                <input
                  required
                  className='bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                  type="text"
                  placeholder='Vehicle Plate'
                  value={vehiclePlate}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/\s/g, '').toUpperCase().slice(0, 10);
                    setVehiclePlate(newValue);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === ' ') {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className='flex gap-3'>
                <input
                  required
                  className='bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                  type="number"
                  placeholder='Vehicle Capacity'
                  value={vehicleCapacity}
                  onChange={(e) => {
                    setVehicleCapacity(e.target.value)
                  }}
                />
                <select
                  required
                  className='bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                  value={vehicleType}
                  onChange={(e) => {
                    setVehicleType(e.target.value)
                  }}
                >
                  <option value="" disabled className='text-gray-400'>Select Vehicle Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="motorcycle">Moto</option>
                </select>
              </div>
            </div>

            <button
              className='bg-black text-white font-semibold rounded-xl px-4 py-3 w-full text-base hover:bg-gray-800 transition-colors mt-2'
            >Create Captain Account</button>

            <p className='text-center text-sm text-gray-600 pt-1'>Already have a account? <Link to='/captain-login' className='text-blue-600 font-medium hover:underline'>Login here</Link></p>
          </form>
        </div>
        
        <div className='pt-4'>
          <p className='text-xs leading-tight text-gray-500'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden md:flex min-h-screen items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          <div className='bg-white rounded-2xl border border-gray-200 shadow-lg p-10 max-h-[90vh] overflow-y-auto'>
            <form onSubmit={(e) => {
              submitHandler(e)
            }} className='space-y-6'>
              <div>
                <h3 className='text-base font-semibold mb-2 text-gray-900'>What's our Captain's name</h3>
                <div className='flex gap-3'>
                  <input
                    required
                    className='bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                    type="text"
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                  />
                  <input
                    required
                    className='bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                    type="text"
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div>
                <h3 className='text-base font-semibold mb-2 text-gray-900'>What's our Captain's email</h3>
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

              <div>
                <h3 className='text-base font-semibold mb-2 text-gray-900'>Vehicle Information</h3>
                <div className='flex gap-3 mb-3'>
                  <input
                    required
                    className='bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                    type="text"
                    placeholder='Vehicle Color'
                    value={vehicleColor}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[0-9]/g, '');
                      setVehicleColor(newValue);
                    }}
                  />
                  <input
                    required
                    className='bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                    type="text"
                    placeholder='Vehicle Plate'
                    value={vehiclePlate}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/\s/g, '').toUpperCase().slice(0, 10);
                      setVehiclePlate(newValue);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className='flex gap-3'>
                  <input
                    required
                    className='bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                    type="number"
                    placeholder='Vehicle Capacity'
                    value={vehicleCapacity}
                    onChange={(e) => {
                      setVehicleCapacity(e.target.value)
                    }}
                  />
                  <select
                    required
                    className='bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 w-1/2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                    value={vehicleType}
                    onChange={(e) => {
                      setVehicleType(e.target.value)
                    }}
                  >
                    <option value="" disabled className='text-gray-400'>Select Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="auto">Auto</option>
                    <option value="motorcycle">Moto</option>
                  </select>
                </div>
              </div>

              <button
                className='bg-black text-white font-semibold rounded-xl px-4 py-3.5 w-full text-base hover:bg-gray-800 transition-colors mt-2'
              >Create Captain Account</button>

              <p className='text-center text-sm text-gray-600 pt-2'>Already have a account? <Link to='/captain-login' className='text-blue-600 font-medium hover:underline'>Login here</Link></p>
            </form>
            
            <div className='pt-6 mt-6 border-t border-gray-200'>
              <p className='text-xs leading-tight text-gray-500 text-center'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup