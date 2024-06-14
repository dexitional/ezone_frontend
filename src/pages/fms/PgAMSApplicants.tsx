import React, { useState } from 'react'
import PageTitle from '../../components/ams/PageTitle'
import Service from '../../utils/amsService'
import { redirect, useLoaderData } from 'react-router'
import ApplicantListView from '../../components/ams/ApplicantListView'
import ApplicantCardItem from '../../components/ams/ApplicantCardItem'
type Props = {}

// Delete Action for Phase
export async function action({ params }) {
  await Service.deleteApplicant(params.applicantId);
  return redirect(`/ams/applicants`);
}

export async function loader({ request }) {
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = new URL(request.url).searchParams.get('page') || 1;
  const data = await Service.fetchApplicants(search,page);
  return { data, search, page }
}

function PgAMSApplicants({}: Props) {
  const [ view, setView ] = useState('card')
  const { data: { data, totalPages,totalData }, page, search }: any = useLoaderData()
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Applicants" createtext="" createlink="" pages={totalPages} setView={setView} view={view} />
      <div className="">
         { view == 'card' && (
            <div className="grid md:grid-cols-3 gap-3 md:gap-6">
              { data && data?.map((row:any) => (<ApplicantCardItem key={row.id} data={row} /> ))}
              { !data && (<div className="p-3 border rounded-xl"><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Records ...</h1></div>)}
            </div>
          )}

         { view == 'list' && (
           <ApplicantListView data={data} />
         )}
         
      </div>
    </div>
  )
}

export default PgAMSApplicants