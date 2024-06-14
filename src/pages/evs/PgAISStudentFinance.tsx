import React from 'react'
import Service from '../../utils/aisService'
import { useLoaderData } from 'react-router';
import AISFinanceCard from '../../components/ais/AISFinanceCard';


type Props = {}

export async function loader({ params }){
   const data = await Service.fetchStudentFinance(params.studentId);
   return { data }
}

function PgAISStudentFinance({}: Props) {
  const { data } :any = useLoaderData();
  
  return (
    <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-8 ">
       <AISFinanceCard data={data} />
    </div>
  )
}

export default PgAISStudentFinance