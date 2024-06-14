import React from 'react'
import Service from '../../utils/aisService'
import { useLoaderData } from 'react-router';
import AISIDCard from '../../components/ais/AISIDCard';
import StudentIDCard from '../../components/ais/StudentIDCard';
import AISIDCardMLK from '../../components/ais/AISIDCardMLK';


type Props = {}

export async function loader({ params }){
   const data = await Service.fetchStudent(params.studentId)
   return { data }
}

function PgAISStudentIDCard({}: Props) {
  const { data } :any = useLoaderData();
  
  return (
    <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-8 ">
       <AISIDCardMLK data={data} />
    </div>
  )
}

export default PgAISStudentIDCard