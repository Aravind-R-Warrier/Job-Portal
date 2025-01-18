import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
      <img style={{height:'70px',padding:'5px'}} src='https://graphicdesignjunction.com/wp-content/uploads/2018/04/colorful_logo_3.jpg' alt="" />
      <p className='flex-1 border-1 border-grey-400 pl-4 text-sm text-gray-500 max-sm:hidden'>@Copyright @AravindRwarrier | All Right Reserved</p>
      <div className='flex gap-2.5'>
        <img width={38} src={assets.instagram_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
        <img width={38} src={assets.facebook_icon} alt="" />
      </div>
    </div>
  )
}

export default Footer
