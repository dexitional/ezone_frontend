import React from 'react'
import Header from '../Header'
import DricNavItem from './LASNavItem'
import { FaChartBar, FaRegChartBar } from 'react-icons/fa'
import Footer from '../Footer'
import { Outlet } from 'react-router'
import DricNav from './LASNav'
import DricLogoBox from './LASLogoBox'
import DricRoleNav from './LASRoleNav'
import { useUserStore } from '../../utils/authService'
import LASRoleNav from './LASRoleNav'
import LASLogoBox from './LASLogoBox'
import LASNav from './LASNav'

type Props = {
    children: React.ReactNode
}

function LASLayout({ children }: Props) {
  
  return (
    <div className="w-full h-screen flex flex-col">
    <Header />
    <LASRoleNav />
    <main className="w-full flex flex-col overflow-y-scroll">
      <section className="mx-1.5 md:mx-auto w-full md:max-w-7xl flex">
         <div className="z-20 w-56 h-full bg-gradient-to-r from-white to-zinc-200/50 bg-opacity-5 hidden md:flex flex-col space-y-10">
            <LASLogoBox />
            <LASNav />
         </div>
         <div className="flex-1 min-h-fit">
             <Outlet />
         </div>
      </section>
      
    </main>
    <Footer />
</div>
  )
}

export default LASLayout