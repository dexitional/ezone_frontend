import React, { useState } from 'react'
import PageTitle from '../../components/ams/PageTitle'
import Service from '../../utils/amsService'
import { redirect, useLoaderData } from 'react-router'
import LetterListView from '../../components/ams/LetterListView'
import LetterCardItem from '../../components/ams/LetterCardItem'
type Props = {}

export async function action({ params }) {
  await Service.deleteLetter(params.letterId);
  return redirect("/ams/letters");
}

export async function loader({ request }) {
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = new URL(request.url).searchParams.get('page') || 1;
  const data = await Service.fetchLetters(search,page);
  return { data, search, page }
}

function PgAMSLetters({}: Props) {
  const [ view, setView ] = useState('card')
  const { data: { data, totalPages,totalData }, page, search }: any = useLoaderData()
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Letters" createtext="New" createlink="create" pages={totalPages} setView={setView} view={view} />
      <div className="">
         { view == 'card' && (
            <div className="grid md:grid-cols-3 gap-3 md:gap-6">
              { data && data?.map((row:any) => (<LetterCardItem key={row.id} data={row} /> ))}
              { !data && (<div className="p-3 border rounded-xl"><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Records ...</h1></div>)}
            </div>
          )}

         { view == 'list' && (
           <LetterListView data={data} />
         )}
         
      </div>
    </div>
  )
}

export default PgAMSLetters