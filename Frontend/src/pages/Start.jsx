import React from 'react'
import { Link } from 'react-router-dom'
import logo2 from '../assets/logo2.png'

const Start = () => {
  return (
    <div className='h-[100dvh] w-full overflow-hidden relative bg-gray-950'>
      {/* Mobile background image */}
      <div className='absolute inset-0 bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] md:hidden scale-105 animate-[subtle-zoom_20s_ease-in-out_infinite]' />
      
      {/* Desktop background image */}
      <div className='absolute inset-0 bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2670&auto=format&fit=crop)] hidden md:block' />
      
      {/* Mobile overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 md:hidden' />
      
      {/* Desktop/Tablet professional gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-950/70 backdrop-blur-[2px] hidden md:block' />
      
      {/* Subtle grid pattern overlay - desktop only */}
      <div className='absolute inset-0 opacity-[0.03] hidden md:block' style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px),
                         repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 3px)`
      }} />
      
      {/* Content */}
      <div className='relative h-full flex flex-col'>
        {/* Logo section */}
        <div className='pt-8 px-8 md:pt-12 md:px-12 animate-[fade-slide-down_0.6s_ease-out] md:animate-[fade-in_0.8s_ease-out]'>
          {/* Mobile logo */}
          <img className='w-28 drop-shadow-2xl hover:scale-105 transition-transform duration-300 md:hidden' src={logo2} alt="Zeno Logo" />
          
          {/* Desktop logo */}
          <div className='hidden md:inline-block backdrop-blur-sm bg-white/5 p-3 rounded-2xl border border-white/10 shadow-2xl'>
            <img className='w-28 drop-shadow-2xl' src={logo2} alt="Zeno Logo" />
          </div>
        </div>
        
        {/* Bottom card */}
        <div className='mt-auto text-center bg-white/95 md:bg-white backdrop-blur-sm md:backdrop-blur-none rounded-t-3xl md:rounded-[2rem] shadow-2xl md:shadow-[0_20px_80px_rgba(0,0,0,0.3)] p-8 md:p-12 md:mx-auto md:mb-16 md:max-w-lg md:w-full animate-[slide-up_0.8s_ease-out] md:animate-[slide-up_1s_ease-out_0.2s_both] border-t-4 border-black/5 md:border-t md:border-gray-100'>
          
          {/* Decorative element - desktop only */}
          <div className='hidden md:block w-16 h-1.5 bg-gradient-to-r from-gray-800 to-black rounded-full mx-auto mb-10' />
          
          {/* Mobile heading */}
          <div className='md:hidden'>
            <h2 className='text-3xl font-bold text-gray-900 mb-3 tracking-tight'>
              Get Started with Zeno
            </h2>
            <p className='text-gray-600 mb-8 text-base'>
              Your journey begins here
            </p>
          </div>
          
          {/* Desktop heading */}
          <div className='hidden md:block space-y-2 mb-10'>
            <h2 className='text-5xl font-bold text-gray-900 tracking-tight leading-tight'>
              Get Started with <span className='block mt-1 bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent'>Zeno</span>
            </h2>
            <p className='text-gray-600 text-xl font-light pt-2'>
              Your journey begins here
            </p>
          </div>
          
          {/* Mobile button */}
          <Link 
            to='/login' 
            className='md:hidden group flex items-center justify-center w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-900 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden'
          >
            <span className='relative z-10'>Continue</span>
            <div className='absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
          </Link>
          
          {/* Desktop button */}
          <Link 
            to='/login' 
            className='hidden md:flex group relative items-center justify-center w-full bg-gradient-to-r from-gray-900 to-black text-white py-5 rounded-2xl font-semibold text-lg tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-800'
          >
            <span className='relative z-10 flex items-center gap-2'>
              Continue
              <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M13 7l5 5m0 0l-5 5m5-5H6' />
              </svg>
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-black to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            <div className='absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500' />
          </Link>
          
          {/* Trust indicators - desktop only */}
          <div className='hidden md:block mt-8 pt-6 border-t border-gray-100'>
            <div className='flex items-center justify-center gap-6 text-gray-400 text-sm'>
              <div className='flex items-center gap-1.5'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
                <span>Secure</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
                <span>Trusted</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M13 7H7v6h6V7z' />
                  <path fillRule='evenodd' d='M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z' clipRule='evenodd' />
                </svg>
                <span>Reliable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes subtle-zoom {
          0%, 100% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  )
}

export default Start