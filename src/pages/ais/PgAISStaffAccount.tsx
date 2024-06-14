import React from 'react'
import Service from '../../utils/aisService'
import { useLoaderData } from 'react-router';
import AISAccountCard from '../../components/ais/AISAccountCard';
import AISStaffAccountCard from '../../components/ais/AISStaffAccountCard';


type Props = {}

export async function loader({ params }){
  const data = await Service.fetchStaff(params.staffId)
  const isUser = await Service.checkUser(params.staffId)
   return { data,isUser }
}

function PgAISStaffAccount({}: Props) {
  const { data,isUser } :any = useLoaderData();
  console.log(isUser)
  return (
    <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-8 ">
       <AISStaffAccountCard data={data} isUser={isUser} />
    </div>
  )
}

export default PgAISStaffAccount