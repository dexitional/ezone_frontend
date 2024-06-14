import React from 'react'
import { FaRegRectangleList } from 'react-icons/fa6'
import { MdHomeFilled, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import Service from '../../utils/evsService'
import { useLoaderData } from 'react-router'
import { Link } from 'react-router-dom'

type Props = {}

export async function loader({ params, request }) {
    const data = await Service.fetchDepartments(params.facultyId);
    return { data,params }
}

function LASByDepartmentList({}: Props) {
    const { data,params }: any  = useLoaderData();
    return (
        <div className="border bg-blue-50/20 rounded-xl divide-y shadow-md overflow-hidden">
             <h1 className="p-2 md:px-6 md:py-3 bg-blue-950/50 text-white text-xs md:text-base font-medium flex flex-col md:flex-row items-center md:justify-between space-y-2 md:space-y-0 md:space-x-4">
                <div className="flex item-center space-x-4 uppercase tracking-widest">
                    <MdHomeFilled className="hidden md:block h-5 w-5" />
                    <span>Filter Lecturers by Department</span>
                </div>
                <Link to={`/las/dash/colleges/${params.collegeId}/faculties`} className="py-0.5 px-2 rounded border border-white flex items-center ">
                    <MdKeyboardArrowLeft className="h-6 w-6" />
                    <span>Go Back</span>
                </Link>
                
            </h1>
            { data && data.map((row: any) => (
            <Link key={row.deptid} to={`${row.deptid}/candidates`} className="p-2 md:px-6 md:py-3 text-blue-950/50 font-medium flex items-center justify-between space-x-4">
                <div className="flex item-center space-x-4">
                    <FaRegRectangleList className="hidden md:block h-5 w-5" />
                    <span className="capitalize">{row.long_name?.toLowerCase()}</span>
                </div>
                <MdKeyboardArrowRight className="h-6 w-6" />
            </Link>
            ))}
        </div>
      )
}

export default LASByDepartmentList