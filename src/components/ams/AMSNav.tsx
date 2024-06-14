import React from 'react'
import { FaChartBar } from 'react-icons/fa'
import { GrDashboard } from 'react-icons/gr'
import AISNavItem from './AMSNavItem'
import AMSNavItem from './AMSNavItem'

type Props = {
  user:any;
}

function AMSNav({ user }: Props) {
  const aisRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'hrs')
  return (
    <div className="py-2 px-2 flex-1 flex flex-col space-y-1 md:space-y-2">
        {['hrs techlead','hrs admin'].includes(aisRole?.role_name?.toLowerCase()) && <AISNavItem title="System Reports" url="reports" Icon={FaChartBar} /> }
        <AMSNavItem title="Session Module" url="sessions" Icon={GrDashboard} /> 
        <AMSNavItem title="Voucher Module" url="vouchers" Icon={GrDashboard} /> 
        <AMSNavItem title="Letters Module" url="letters" Icon={GrDashboard} /> 
        <AMSNavItem title="Applicant Module" url="applicants" Icon={GrDashboard} /> 
        <AMSNavItem title="Shortlist Module" url="shortlists" Icon={GrDashboard} /> 
        <AMSNavItem title="Admitted Students" url="matriculants" Icon={GrDashboard} /> 
    </div>
  )
}

export default AMSNav