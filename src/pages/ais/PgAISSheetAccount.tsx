import React from 'react'
import Service from '../../utils/aisService'
import { useLoaderData } from 'react-router';
import AISAccountCard from '../../components/ais/AISAccountCard';
import AISStaffAccountCard from '../../components/ais/AISStaffAccountCard';
import AISSheetAccountCard from '../../components/ais/AISSheetAccountCard';


type Props = {}

export async function loader({ params }){
  const data = await Service.fetchStaff(params.staffId)
  const isUser = await Service.checkUser(params.staffId)
   return { data,isUser }
}

function PgAISSheetAccount({}: Props) {
  const { data,isUser } :any = useLoaderData();
  console.log(isUser)
  return (
    <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-8 ">
       <AISSheetAccountCard data={data} isUser={isUser} />
    </div>
  )
}

export default PgAISSheetAccount