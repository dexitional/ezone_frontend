import React, { useState } from 'react'
import SubPageTitle from '../../components/ams/SubPageTitle'
// @ts-ignore
import Logo from '../../assets/img/logo/mlk/logo.png'
import { Form, Link } from 'react-router-dom'
import Service from '../../utils/amsService'
import { Outlet, redirect, useLoaderData } from 'react-router'
import { TbEdit } from 'react-icons/tb'
import ReactHtml from "html-react-parser";
import { PiSignatureBold } from 'react-icons/pi'
import LetterTemplate from '../../components/ams/LetterTemplate'

type Props = {}


// Delete Action for Phase
export async function action({ params }) {
  await Service.deleteMatriculant(params.studentId);
  return redirect(`/ams/matriculants/${params.matriculantId}`);
}

// Loader for Single Project
export async function loader({ params }){
  const data = await Service.fetchMatriculant(params.matriculantId)
  console.log(data)
  return { data }
}

function PgAMSMatriculant({}: Props) {

  const { data } :any = useLoaderData();
  // return <pre>{JSON.stringify(data)}</pre>
  return (
    <main className="md:pl-10 p-3 md:p-6 space-y-3 md:space-y-10">
      <SubPageTitle title={``} page="MATRICULANT" />
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
              <div className="w-full flex space-x-2">
                  <div className="block md:hidden p-2 md:p-4 h-16 w-16 border rounded-xl shadow-lg bg-white">
                    <img src={Logo} className="h-12 w-12 object-contain" />
                  </div>
                  <h1 className="pr-6 text-md md:text-3xl md:tracking-wide leading-5 font-semibold text-primary/70">{data?.student?.fname}{data?.student?.mname && data?.student?.mname+' '} {data?.student?.lname}</h1>
              </div>
              <div className="w-full flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 text-zinc-400 text-lg">
                <div className="flex items-center space-x-2"> 
                    <span className="px-3 py-0.5 text-xs md:text-sm font-medium tracking-wider capitalize bg-primary rounded-md text-white">{data?.student?.gender == 'M' ? 'Male': 'Female'}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                    <span className="tracking-wider text-xs md:text-base capitalize">{data?.category?.title }</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                 </div>
                 <div className="flex items-center space-x-2">
                    <PiSignatureBold className="md:h-6 md:w-6 text-primary/70" />
                    {/* <span className="text-xs md:text-base tracking-wider font-medium capitalize">{data?.program?.longName}</span> */}
                    <span className="px-1 py-0.5 bg-white border border-primary/40 rounded-lg text-sm text-gray-500 relative">Level { Math.ceil(data?.semesterNum/2)*100 }</span>
                </div>
              </div>
              <code className="py-2 px-4 w-fit bg-primary-accent/5 text-gray-400 md:text-gray-500 text-xs md:text-sm font-medium font-roboto">{data?.program?.longName}</code>
            </div>
         </section>
         <section className="w-full">
            <div className="p-2 w-full border rounded-md md:rounded-xl bg-white">
              <LetterTemplate data={data}/>
            </div>
         </section>
      </div>
    </main>
  )
}

export default PgAMSMatriculant