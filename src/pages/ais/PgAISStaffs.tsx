import React, { useState } from 'react'
import PageTitle from '../../components/ais/PageTitle'
import Service from '../../utils/aisService'
import { redirect, useLoaderData } from 'react-router'
import StudentListView from '../../components/ais/StudentListView'
import StudentCardItem from '../../components/ais/StudentCardItem'
import StaffCardItem from '../../components/ais/StaffCardItem'
import StaffListView from '../../components/ais/StaffListView'
type Props = {}

export async function action({ params }) {
  await Service.deleteStaff(params.staffId);
  return redirect("/ais/staff");
}

export async function loader({ request }) {
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = new URL(request.url).searchParams.get('page') || 1;
  const data = await Service.fetchStaffs(search,page);
  return { data, search, page }
}

function PgAISStaffs({}: Props) {
  const [ view, setView ] = useState('card')
  const { data: { data, totalPages,totalData }, page, search }: any = useLoaderData()
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Staff" createtext="New" createlink="create" pages={totalPages} setView={setView} view={view} />
      <div className="">
         { view == 'card' && (
            <div className="grid md:grid-cols-3 gap-3 md:gap-6">
              { data && data?.map((row:any) => (<StaffCardItem key={row.id} data={row} /> ))}
              { !data && (<div className="p-3 border rounded-xl"><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Records ...</h1></div>)}
            </div>
          )}

         { view == 'list' && (
           <StaffListView data={data} />
         )}
         
      </div>
    </div>
  )
}

export default PgAISStaffs