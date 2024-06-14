import React, { useState } from 'react'
import SubPageTitle from '../../components/ais/SubPageTitle'
// @ts-ignore
import Logo from '../../assets/img/logo/mlk/logo.png'
import { MdLocationOn } from 'react-icons/md'
import { Form, Link } from 'react-router-dom'
import Service from '../../utils/aisService'
import { Outlet, redirect, useLoaderData } from 'react-router'
import moment from 'moment'
import { TbEdit } from 'react-icons/tb'
import { FaNewspaper } from 'react-icons/fa6'
import PgAISStudentProfile from './PgAISStudentProfile'
import SubNavLink from '../../components/ais/SubNavLink'
import { RiCommunityFill } from 'react-icons/ri'
import { HiAcademicCap } from 'react-icons/hi2'
import { getStudyMode } from '../../utils/util'

type Props = {}


// Delete Action for Phase
export async function action({ params }) {
  await Service.deleteProgram(params.sheetId);
  return redirect(`/ais/sheets/${params.sheetId}`);
}

// Loader for Single Project
export async function loader({ params }){
  const data = await Service.fetchSheet(params.sheetId)
  return { data }
}

function PgAISSheet({}: Props) {

  const { data } :any = useLoaderData();
  return (
    <main className="md:pl-10 p-3 md:p-6 space-y-3 md:space-y-10">
      <SubPageTitle title={``} page="SHEET" />
      <div className="p-3 md:p-6 border bg-slate-50/50 rounded-xl md:space-y-6 space-y-4 ">
         <section className="relative flex space-x-2 md:space-x-6">
            <div className="hidden md:block p-2 md:p-2 h-16 w-16 md:h-24 md:w-24 border rounded-xl shadow-lg bg-white">
              <img src={Logo} className="h-12 w-12 md:h-20 md:w-20 object-contain" />
            </div>
            <Link to={`edit`} className="p-1 md:py-1.5 md:px-2 absolute right-0 top-0 bg-slate-50 border border-gray-200 rounded flex">
                {/* <span className="text-gray-400">EDIT</span> */}
                <TbEdit className="h-5 w-5 text-gray-300"/>
            </Link>
            <div className="flex-1 flex flex-col space-y-4 md:space-y-3">
              <div className="flex space-x-2">
                  <div className="block md:hidden p-2 md:p-4 h-16 w-16 border rounded-xl shadow-lg bg-white">
                    <img src={Logo} className="h-12 w-12 object-contain" />
                  </div>
                  <h1 className="text-md md:text-3xl md:tracking-wide leading-5 font-semibold text-primary/70">{data?.course?.title?.toUpperCase()} {data?.course?.id}</h1>
              </div>
              <div className="w-full flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 text-zinc-400 text-lg">
                <div className="flex items-center space-x-2 font-semibold"> 
                    <span className="px-3 py-0.5 text-xs md:text-sm font-bold tracking-wider capitalize bg-primary rounded-md text-white">{data?.courseId}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                    <span className="tracking-wider text-xs md:text-base capitalize">L { Math.ceil(data?.semesterNum/2)*100 }</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                 </div>
                 <div className="flex items-center space-x-2">
                    <HiAcademicCap className="md:h-5 md:w-5 text-primary/70" />
                    <span className="text-xs md:text-base tracking-wider font-medium uppercase">{data?.session?.title } </span>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 text-zinc-400 text-lg">
                <div className="flex items-center space-x-2 font-semibold"> 
                    <span className="px-3 py-0.5 text-xs md:text-sm font-bold tracking-wider capitalize bg-primary-accent/80 rounded-md text-white">{data.finalized ? 'CLOSED': data.certified ? 'PUBLISHED': data.certified ? 'SUBMITTED': 'CAPTURE MODE' }</span>
                    { data.studyMode && 
                    <>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                      <span className="tracking-wider text-xs md:text-base uppercase">{`${getStudyMode(data.studyMode)} Session`}</span>
                    </>}
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                 </div>
                 <div className="flex items-center space-x-2">
                    <HiAcademicCap className="md:h-5 md:w-5 text-primary/70" />
                    <span className="text-xs md:text-base tracking-wider font-medium uppercase">{data.session?.tag == 'main' ? 'MAIN STREAM' :'JANUARY/SUB STREAM'}</span>
                </div>
              </div>
            </div>
         </section>

        <section>
          <nav className="p-2 w-full md:p-3 flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 border border-primary/5 rounded-md md:rounded-xl bg-primary/5 text-primary-dark/70 text-xs font-noto font-semibold tracking-wider">
            <SubNavLink title="STUDENTS" url="students" />
            <SubNavLink title="SCORES" url="scores" />
            <SubNavLink title="CAPTURE" url="capture" />
            <SubNavLink title="SHEET MANAGER" url="account" />
            {/* <SubNavLink title="ACTIVITY" url="activity" /> */}
          </nav>
        </section>
         <section className="gap-y-2">
             <div className="p-2 w-full md:py-4 md:px-6 flex flex-col space-y-3 md:space-y-6 border rounded-md md:rounded-xl bg-white">
                <Outlet />
             </div>
         </section>

         { data?.projects?.length ? (
         <section>
            {/* Project History */}
            <div className="p-2 md:py-4 md:px-6 flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-10 border rounded-md md:rounded-xl bg-white">
               <h1 className="py-0.5 px-2 md:px-3 w-fit text-xs md:text-base font-semibold rounded-md bg-blue-950/60 text-white tracking-widest uppercase -skew-x-6">PROJECTS FUNDED</h1>
               <div className="md:pl-6 space-y-4">
                { data?.projects?.map((row:any) => (
                  <div key={row.id} className="flex md:items-center space-x-6">
                      <FaNewspaper className="w-3 h-3 md:h-5 md:w-6 text-primary/70" />
                      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                         <pre className="text-xs md:text-base text-gray-500">{row.title}</pre>
                         <span className="py-0.5 px-2 w-fit bg-slate-200 font-semibold text-[0.6rem] md:text-xs text-gray-500 rounded uppercase">START - { moment(row.start).format('MMM DD, YYYY') }</span>
                         <span className="py-0.5 px-2 w-fit bg-slate-200 font-semibold text-[0.6rem] md:text-xs text-gray-500 rounded uppercase">END - { moment(row.end).format('MMM DD, YYYY') }</span>
                      </div>
                  </div>
                ))}
                </div>
             </div>
         </section>
         ): null }
         
        
      </div>
    </main>
  )
}

export default PgAISSheet