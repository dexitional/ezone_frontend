import React from 'react'
import { FaEnvelope, FaFolder, FaPhone, FaTrash } from 'react-icons/fa'
import { MdEditDocument } from 'react-icons/md'
import { Form, Link } from 'react-router-dom'
// @ts-ignore
import Logo from '../../assets/img/logo/mlk/logo.png'
import moment from 'moment'
import { FaFilePdf, FaTimeline } from 'react-icons/fa6'
import { IoIosTime } from "react-icons/io";
import { HiMiniAcademicCap } from 'react-icons/hi2'
import { AiOutlineFieldNumber } from 'react-icons/ai'

type Props = {
  data: any;
}

function CalendarCardItem({ data }: Props) {
  return (
    <div className="p-4 md:p-6 min-h-max border border-primary/20 rounded-xl bg-slate-50/50 hover:bg-slate-100 space-y-4 md:group">
    <h2 className="text-base md:text-base font-semibold font-noto text-gray-500 uppercase"> {data?.title?.toUpperCase()}</h2>
    <div className="w-full flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-2">
          <div className="text-sm md:text-sm text-primary-dark/70 font-bold font-roboto capitalize">YEAR {data?.year} - {data?.semester}</div>
          { data?.default && <div className="py-0.5 px-2 text-sm rounded bg-primary/60 text-white font-bold">DEFAULT</div>}
      </div>
    </div>
    <div className="space-y-1 font-roboto">
        { data.registerStart && 
        <div className="flex items-center space-x-4">
            <IoIosTime className="h-4 w-5 text-primary/70" />
            <span className="px-2 py-0 bg-green-50 rounded border text-sm text-gray-500">Registration Opens: &nbsp;&nbsp;&nbsp;<b>{moment(data.registerStart).format("MMM DD, YY")}</b></span>
        </div>
        }
        { data.registerEnd && 
        <div className="flex items-center space-x-4">
            <IoIosTime className="h-4 w-5 text-primary/70" />
            <span className="px-2 py-0 bg-green-50 rounded border text-sm text-gray-500">Registration Closes:&nbsp;&nbsp;&nbsp;<b>{moment(data.registerEnd).format("MMM DD, YY")}</b></span>
        </div>
        } 
        { data.registerEndLate && 
        <div className="flex items-center space-x-4">
            <IoIosTime className="h-4 w-5 text-primary/70" />
            <span className="px-2 py-0 bg-green-50 rounded border text-sm text-gray-500">Registration Extends:&nbsp;<b>{moment(data.registerEndLate).format("MMM DD, YY")}</b></span>
        </div>
        }
        { data.progressStudent && 
        <div className="flex items-center space-x-4">
            <HiMiniAcademicCap className="shrink-0 h-5 w-5 text-primary/70" />
            <span className={`${data?.progressStudent ? 'text-gray-500':'text-red-400'} indent-2 text-xs  font-bold capitalize`}>{data?.progressStudent ? 'STUDENT LEVELS PROGRESSED':'LEVELS NOT PROGRESSED'}</span>
        </div>
        }
        { data?.assignLateSheet && 
        <div className="flex items-center space-x-4">
            <HiMiniAcademicCap className="shrink-0 h-5 w-5 text-primary/70" />
            <span className={`text-gray-500 text-xs  font-bold capitalize`}>LATE ENTRIES ACTIVATED</span>
        </div>
         }
    </div>
    <div className="flex flex-col space-y-1">
        
        <div className="px-3 py-2 opacity-80 md:opacity-100 flex rounded-md border bg-white items-center md:justify-between space-x-2 group">
          <Link to={`${encodeURIComponent(data?.id)}`} className="py-0.5 px-2 rounded flex items-center space-x-1.5 bg-primary/60">
            {/* <FcViewDetails className="h-4 w-4 text-white"/> */}
            <FaFolder className="h-4 w-4 text-amber-200"/>
            <span className="text-sm text-white font-semibold">View</span>
          </Link>
          <Link to={`${encodeURIComponent(data?.id)}/edit`} className="py-0.5 px-2 rounded flex items-center space-x-1.5 bg-primary/60">
            <MdEditDocument className="h-4 w-4 text-green-200"/>
            <span className="text-sm text-white font-semibold">Edit</span>
          </Link>
          <Form method="post" action={`${data?.id}/destroy`} onSubmit={(e)=> { if(!confirm("Do you want to delete")) e.preventDefault(); return false; }} className="py-0.5 px-2 rounded flex items-center space-x-1.5 bg-primary-accent/60">
            <FaTrash className="h-3 w-4 text-pink-100" />
            <button type="submit" className="text-sm text-white font-semibold">Delete</button>
          </Form>
         
        </div>
    </div>
    
  </div>
  )
}

export default CalendarCardItem