import React from 'react'
import { FaChartBar } from 'react-icons/fa'
import { GrDashboard } from 'react-icons/gr'
import AISNavItem from './FMSNavItem'
import AMSNavItem from './FMSNavItem'
import FMSNavItem from './FMSNavItem'

type Props = {
  user:any;
}

function FMSNav({ user }: Props) {
  const aisRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'hrs')
  return (
    <div className="py-2 px-2 flex-1 flex flex-col space-y-1 md:space-y-2">
        {['hrs techlead','hrs admin'].includes(aisRole?.role_name?.toLowerCase()) && <FMSNavItem title="System Reports" url="reports" Icon={FaChartBar} /> }
        {/* <FMSNavItem title="Student Charges" url="charges" Icon={GrDashboard} />  */}
        <FMSNavItem title="Student Accounts" url="accounts" Icon={GrDashboard} /> 
        <FMSNavItem title="Student Debtors" url="debtors" Icon={GrDashboard} /> 
        <FMSNavItem title="Fees Payments" url="payments" Icon={GrDashboard} /> 
        <FMSNavItem title="Other Payments" url="transacts" Icon={GrDashboard} />
        {/* <FMSNavItem title="Voucher Sales" url="vsales" Icon={GrDashboard} />  */}
        {/* <FMSNavItem title="Voucher Costs" url="vcosts" Icon={GrDashboard} />  */}
        {/* <FMSNavItem title="Service Costs" url="services" Icon={GrDashboard} />  */}
        <FMSNavItem title="Student Bills" url="bills" Icon={GrDashboard} /> 
        
    </div>
  )
}

export default FMSNav