import React from 'react'
import { assets } from '../assets/assets'

function AppDownload() {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-20'>
      <div className='relative bg-gradient-to-r from-violet-50 to-purple-50 p-12 sm:p-24 lg:p-32 rounded-lg'>
        <div>
            <h1 className='text-2xl sm:text-4xl font-bold mb-8 max-w-md'>Download Mobile App For Better Experiance</h1>
            <div className='flex gap-4'>
                <a href="#" className='inline-block'>
                    <img className='h-12' src={assets.play_store} alt="" />
                </a>
                <a href="#" className='inline-block'>
                    <img className='h-12' src={assets.app_store} alt="" />
                </a>
            </div>
            <img className='absolute h-80 w-100 right-0 bottom-10 mr-32 max-lg:hidden' src='https://t4.ftcdn.net/jpg/02/95/45/19/360_F_295451981_AKNKM9DdLl4BQ69K048aSGGjXqJ2QWeR.jpg' alt="" />
        </div>
      </div>
    </div>
  )
}

export default AppDownload
