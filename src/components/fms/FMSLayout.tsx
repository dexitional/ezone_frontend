import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet, useNavigation } from 'react-router'
import AISNav from './FMSNav'
import AISRoleNav from './FMSRoleNav'
import AISLogoBox from './FMSLogoBox'
import Loader from '../Loader'
import { useUserStore } from '../../utils/authService'
import FMSRoleNav from './FMSRoleNav'
import FMSLogoBox from './FMSLogoBox'
import FMSNav from './FMSNav'

type Props = {
    children?: React.ReactNode
}

function FMSLayout({ children }: Props) {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  const { logout, user } = useUserStore(state => state);

  return (
    <div className="w-full h-screen flex flex-col justify-between">
    <Header user={user} logout={logout} />
    <FMSRoleNav user={user} />
    <main className="w-full flex-1 flex flex-col md:overflow-y-scroll">
      <section className="md:mx-auto w-full md:max-w-7xl flex">
         <div className="z-20 w-56 h-full bg-gradient-to-r from-white to-primary/5 bg-opacity-5 hidden md:flex flex-col space-y-1">
            <FMSLogoBox />
            <FMSNav user={user} />
         </div>
         <div className={`${loading && 'overflow-hidden'} flex-1`}>
           { loading && <Loader /> }
           <Outlet />
         </div>
      </section>
      
    </main>
    <Footer />
</div>
  )
}

export default FMSLayout