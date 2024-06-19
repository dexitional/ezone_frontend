import React from 'react'

function Footer() {
  return (
    <footer className="w-full border-t md:border-t-0 bg-primary/10 bg-opacity-50">
        <div className="py-3 md:py-0 md:mx-auto w-full md:h-14 md:max-w-7xl flex flex-col md:flex-row items-center md:justify-between space-y-2">
        <span className="py-0.5 px-2 rounded-md md:rounded-lg bg-primary-dark/60 text-white text-sm md:text-base font-bold tracking-wider">electa</span>
        <div className="md:w-2/5 text-xs md:text-sm flex space-x-3 items-center justify-evenly text-primary-dark font-medium">
            <div>Privacy Policy</div>
            <div>Terms of Use</div>
            <div>Security</div>
            <div>&copy;{new Date().getFullYear()} Electa systems</div>
        </div>
        </div>
    </footer>
  )
}

export default Footer