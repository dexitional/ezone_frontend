import React, { useState } from 'react'
import PageTitle from '../../components/ams/PageTitle'
import Service from '../../utils/amsService'
import { redirect, useLoaderData } from 'react-router'
import ShortlistListView from '../../components/ams/ShortlistListView'
import ShortlistCardItem from '../../components/ams/ShortlistCardItem'
type Props = {}

export async function action({ params }) {
  await Service.deleteShortlist(params.shortlistId);
  return redirect("/ams/shortlists");
}

export async function loader({ request }) {
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = new URL(request.url).searchParams.get('page') || 1;
  const data = await Service.fetchShortlists(search,page);
  console.log(data)
  return { data, search, page }
}

function PgAMSShortlists({}: Props) {
  const [ view, setView ] = useState('card')
  const { data: { data, totalPages,totalData }, page, search }: any = useLoaderData() ?? null
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Shortlisted Applicants" createtext="" createlink="" pages={totalPages} setView={setView} view={view} />
      <div className="">
         { view == 'card' && (
            <div className="grid md:grid-cols-3 gap-3 md:gap-6">
              { data && data?.map((row:any) => (<ShortlistCardItem key={row.id} data={row} /> ))}
              { !data && (<div className="p-3 border rounded-xl"><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Records ...</h1></div>)}
            </div>
          )}

         { view == 'list' && (
           <ShortlistListView data={data} />
         )}
         
      </div>
    </div>
  )
}

export default PgAMSShortlists