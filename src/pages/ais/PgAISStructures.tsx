import React, { useState } from 'react'
import PageTitle from '../../components/ais/PageTitle'
import Service from '../../utils/aisService'
import { redirect, useLoaderData } from 'react-router'
import StructureListView from '../../components/ais/StructureListView'
import StructureCardItem from '../../components/ais/StructureCardItem'
type Props = {}

export async function action({ params }) {
  await Service.deleteProgram(params.programId);
  return redirect("/ais/curriculum");
}

export async function loader({ request }) {
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = new URL(request.url).searchParams.get('page') || 1;
  const data = await Service.fetchCurriculums(search,page);
  return { data, search, page }
}

function PgAISStructures({}: Props) {
  const [ view, setView ] = useState('card')
  const { data: { data, totalPages,totalData }, page, search }: any = useLoaderData()
  console.log(data)
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Curriculum" createtext="New" createlink="create" pages={totalPages} setView={setView} view={view} />
      <div className="">
         { view == 'card' && (
            <div className={`grid ${data.length ? 'md:grid-cols-3':'md:grid-cols-2 justify' } gap-3 md:gap-6`}>
              { data?.map((row:any) => (<StructureCardItem key={row.id} data={row} /> ))}
              { !data?.length && (<div className="p-3 border rounded-xl"><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Records ...</h1></div>)}
            </div>
          )}

         { view == 'list' && (
           <StructureListView data={data} />
         )}
      </div>
    </div>
  )
}

export default PgAISStructures