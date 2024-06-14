import React, { useEffect, useLayoutEffect, useState } from 'react'
import PageTitle from '../../components/las/PageTitle'
import Service from '../../utils/aisService'
import { useNavigate, useLoaderData, redirect } from 'react-router'
import { useUserStore } from '../../utils/authService'
import RegistrationListView from '../../components/aisp/RegistrationListView'
import RegistrationSlipView from '../../components/aisp/RegistrationSlipView'
import toast from 'react-hot-toast'

type Props = {}

export async function loader() {
  const user = useUserStore.getState().user;
  const data = await Service.fetchRegistrationMount(user?.user?.tag);
  const slip = await Service.fetchRegistration(user?.user?.tag);
  const student = await Service.fetchStudent(user?.user?.tag);
  
  if(student?.completeStatus) {
     toast("Program completed 💥💥💥",{ className:"text-xl text-primary-dark"})
     return redirect("/aisp/profile")
  }  return { data,slip,student }
}

function PgAISPRegistrations({}: Props) {
  
  const { data,slip,student } :any = useLoaderData();
  const runDefault = () => {
     // Update Compulsory & Locked Courses
     const cdata = data?.courses?.filter((row:any) => row.type == 'C' || (row.type == 'E' && row.lock))?.map((row:any) => row.code);
     useUserStore.setState({ courses: cdata });
  }

  useLayoutEffect(() => {
    runDefault()
  },[])
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <div className="space-y-6">
        <PageTitle title="Registration" createtext="" createlink="" setView={()=> null} view={''} />
        { !slip.length 
          ? <RegistrationListView title={`${data?.session?.toUpperCase()} REGISTRATION PROCEDURE !!`} data={data}  />
          : <RegistrationSlipView  title={`${data?.session?.toUpperCase()} REGISTRATION SLIP`} data={slip}  />
        }
      </div>  
    </div>
  )
}

export default PgAISPRegistrations