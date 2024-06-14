import React from 'react'
import Header from '../Header'
import DricNavItem from './HRSNavItem'
import { FaChartBar, FaRegChartBar } from 'react-icons/fa'
import Footer from '../Footer'
import { Outlet } from 'react-router'
import DricNav from './HRSNav'
import DricLogoBox from './HRSLogoBox'
import DricRoleNav from './HRSRoleNav'
import { useUserStore } from '../../utils/authService'
import HRSRoleNav from './HRSRoleNav'
import HRSLogoBox from './HRSLogoBox'
import HRSNav from './HRSNav'

type Props = {
    children: React.ReactNode
}

function HRSLayout({ children }: Props) {
  
  return (
    <div className="w-full h-screen flex flex-col justify-between">
    <Header />
    <HRSRoleNav/>
    <main className="w-full flex-1 flex flex-col md:overflow-y-scroll">
      <section className="md:mx-auto w-full md:max-w-7xl flex">
         <div className="z-20 w-56 h-full bg-gradient-to-r from-white to-zinc-200/50 bg-opacity-5 hidden md:flex flex-col space-y-10">
            <HRSLogoBox />
            <HRSNav />
         </div>
         <div className="flex-1">
             <Outlet />
         </div>
      </section>
      
    </main>
    <Footer />
</div>
  )
}

export default HRSLayout