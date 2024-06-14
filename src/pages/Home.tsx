import React, { useEffect } from 'react'
// @ts-ignore
import Logo from '../assets/img/logo_portalbr_.png'
import { MdMeetingRoom, MdOutlineSupportAgent } from 'react-icons/md'
import { GiLetterBomb, GiVote } from 'react-icons/gi'
import AppCard from '../components/AppCard'
import { ImProfile } from 'react-icons/im'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ServiceCard from '../components/ServiceCard'
import { useUserStore } from '../utils/authService'
import { FaUsersViewfinder } from 'react-icons/fa6'
import { SiCashapp } from 'react-icons/si'
import { HiAcademicCap } from "react-icons/hi2";
import { PiStudentFill } from 'react-icons/pi'

function Home() {
  
  const { user, logout } = useUserStore(state => state)
  const evsRole =  user?.roles?.find(r => r?.appRole?.app?.tag?.toLowerCase() == 'evs')
  const isEvsAdmin =  user?.roles?.find(r => r?.appRole?.app?.tag?.toLowerCase() == 'evs' && r?.isAdmin)
  
  return (
    <div className="w-full h-screen flex flex-col justify-between">
        <Header user={user} logout={logout} />
        <main className="w-full flex-1 flex flex-col overflow-y-scroll">
          <section className="mx-auto py-6 w-full max-w-6xl space-y-2">
             <h1 className="px-6 md:px-0 text-zinc-400 font-medium md:font-semibold md:text-xl">Browse By Services</h1>
             <div className="p-3 md:p-0 w-full bg-blue-50/50 md:bg-transparent grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4">
                { evsRole && <ServiceCard title="General Elections Portal" Icon={GiVote} link="/evs/dash" /> }
              </div>
          </section>

          { [2,4].includes(user?.user?.group_id) && 
          <section className="mx-auto py-6 w-full max-w-6xl space-y-4">
             <h1 className="px-6 md:px-0 text-zinc-400 font-medium md:font-semibold md:text-xl">Browse By Apps</h1>
             <div className="p-3 md:p-6 w-full bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                 
                  { evsRole &&
                  <AppCard 
                      title="Electa Voting System"
                      desc="Elect leaders, decide on issues by voting and referendum." 
                      Icon={GiVote} 
                      links={[
                        { title:'General Elections Portal', url:'/evs/dash'},
                        { title:'Manage Elections', url:'/evs/admin/elections'},
                      ]} 
                  />
                  }
             </div>
          </section>
          }

        </main>
        <Footer />
    </div>
  )
}

export default Home