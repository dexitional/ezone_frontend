import React from 'react'
import { FaChartBar } from 'react-icons/fa'
import { GrDashboard } from 'react-icons/gr'
import { useUserStore } from '../../utils/authService'
import AISNavItem from './AISNavItem'

type Props = {
  user:any
}

function AISNav({ user }: Props) {
  const aisRole = user?.roles?.find(r => r?.appRole?.app?.tag?.toLowerCase() == 'ais')
  return (
    <div className="py-2 px-2 flex flex-col space-y-1 md:space-y-2 h-[75vh] overflow-y-scroll scrollbar-hide">
        {['ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="System Reports" url="reports" Icon={FaChartBar} /> }
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Calendar Module" url="calendars" Icon={GrDashboard} /> }
        {['ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Student Module" url="students" Icon={GrDashboard} /> }
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Course Module" url="courses" Icon={GrDashboard} /> } 
        {/* <AISNavItem title="Major Module" url="major" Icon={GrDashboard} />  */}
        {['ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Program Module" url="programs" Icon={GrDashboard} /> } 
        {['ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Department Module" url="departments" Icon={GrDashboard} /> } 
        {['ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Faculty Module" url="faculties" Icon={GrDashboard} /> } 
        {['ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Curriculum Module" url="curriculums" Icon={GrDashboard} /> } 
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Scheme Module" url="schemes" Icon={GrDashboard} /> } 
        {['ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Registration Module" url="registrations" Icon={GrDashboard} /> } 
        {['ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Progression Module" url="progression" Icon={GrDashboard} /> } 
        {['ais dean','ais head','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Scoresheets Module" url="sheets" Icon={GrDashboard} /> } 
        {['ais dean','ais head','ais assessor','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="MySheets&reg; Module" url="mysheets" Icon={GrDashboard} /> } 
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Backlogs Module" url="backlogs" Icon={GrDashboard} /> } 
        {['ais clerk','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Pixo System &reg;" url="pixo" Icon={GrDashboard} /> }
        
        
        {['ais clerk','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Deferment Module" url="deferments" Icon={GrDashboard} /> } 
        {['ais clerk','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Transwift Module" url="transwift" Icon={GrDashboard} /> } 
        {['ais clerk','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Circular Module" url="notices" Icon={GrDashboard} /> } 
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Services Module" url="services" Icon={GrDashboard} /> } 
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Resit Module" url="resits" Icon={GrDashboard} /> }
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Graduation Module" url="graduations" Icon={GrDashboard} /> } {/* Graduation Session, Graduation */}
        {/* {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Reports Module &reg;" url="reports" Icon={GrDashboard} /> } */}
        
        {['ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Staff Module" url="staff" Icon={GrDashboard} /> }
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Jobs Module" url="jobs" Icon={GrDashboard} /> }
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title=" Units Module" url="units" Icon={GrDashboard} /> }
        {/* {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title=" Utility Module" url="units" Icon={GrDashboard} /> } Religion,Region,Country,Disability, */}
        
    </div>
  )
}

export default AISNav