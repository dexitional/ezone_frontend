import React from 'react'
import Header from '../Header'
import DricNavItem from './NSSNavItem'
import { FaChartBar, FaRegChartBar } from 'react-icons/fa'
import Footer from '../Footer'
import { Outlet } from 'react-router'
import DricNav from './NSSNav'
import DricLogoBox from './NSSLogoBox'
import DricRoleNav from './NSSRoleNav'
import { useUserStore } from '../../utils/authService'
import LASRoleNav from './NSSRoleNav'
import LASLogoBox from './NSSLogoBox'
import LASNav from './NSSNav'
import NSSRoleNav from './NSSRoleNav'
import NSSLogoBox from './NSSLogoBox'
import NSSNav from './NSSNav'
import HeaderLogin from '../HeaderLogin'

type Props = {
    children: React.ReactNode
}

function NSSSiteLayout({ children }: Props) {
  
  return (
    <div className="w-full h-screen flex flex-col">
    <HeaderLogin />
    
    <main className="w-full flex flex-col overflow-y-scroll">
      <section className="md:mx-auto w-full md:max-w-5xl">
        <div className="flex-1 md:min-h-fit">
           <Outlet />
         </div>
      </section>
      
    </main>
    <Footer />
</div>
  )
}

export default NSSSiteLayout