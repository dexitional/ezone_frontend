import React from 'react'
import CandidateCard from './CandidateCard'
import Service from '../../utils/evsService'
import { useLoaderData } from 'react-router';

export async function loader({ params }){
  const data = await Service.fetchVotes(params.electionId);
  return { data }
}

function PgCandidate() {
  const { data }:any = useLoaderData();
  return (
    <div className="py-3 px-3 flex-1 h-full rounded bg-[#f1f1f1]/30 shadow-inner shadow-gray-500/30 space-y-6">
        <h1 className="px-4 py-2.5 flex items-center justify-between text-xl rounded bg-primary/80 font-semibold text-white">
          <span className="text-white">DISPLAY OF ASPIRANTS</span>
          {/* <span className="p-0.5 px-2 rounded bg-amber-400 text-base text-blue-950 font-extrabold tracking-wider">130232</span> */}
        </h1>
        <div className="py-4 px-2 rounded shadow-inner shadow-gray-500/20 bg-white space-y-4">
        {/* <div className="mx-2 px-10 py-2 rounded-full text-lg text-center text-blue-950 font-extrabold tracking-widest bg-slate-200/70">
            <input type="search" placeholder="Search Register with keyword ..." className="w-full bg-transparent focus:ring-0 focus:outline-none" />
        </div> */}
            <div className="px-2 py-2 h-[31rem] bg-zinc-200/50 shadow-inner space-y-6 overflow-y-auto">
                { data?.portfolios.map((row:any) => (
                  <div key={row.id} className="px-2 py-2 flex-1 bg-white rounded space-y-2">
                    <h2 className="px-6 py-1 rounded text-xs md:text-lg text-center text-primary font-extrabold tracking-widest bg-slate-200/70">{row?.title?.toUpperCase()}</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 place-content-start overflow-y-scroll">
                        { row?.candidates?.filter((m:any) => m.orderNo != 0)?.sort((a,b) => a.orderNo-b.orderNo).map((r:any) => (<CandidateCard key={r?.id} data={r} vtotal={data?.electors?.length} />))}
                    </div>
                  </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default PgCandidate