import React from 'react'
import CandidateCard from './CandidateCard'
import Service from '../../utils/evsService'
import { useLoaderData } from 'react-router';
import CandidateCardNo from './CandidateCardNo';

export async function loader({ params }){
  const data = await Service.fetchVotes(params.electionId);
  return { data }
}

function PgResult() {
  const { data }:any = useLoaderData();
  return (
    <div className="py-3 px-3 flex-1 h-full rounded bg-[#f1f1f1]/30 shadow-inner shadow-gray-500/30 space-y-6">
        <h1 className="px-4 py-2.5 flex items-center justify-between text-lg md:text-xl rounded bg-primary/80 font-semibold text-white">
          <span className="text-white">FINAL ELECTION RESULTS</span>
          <button className="p-0.5 px-2 rounded bg-purple-50 text-base text-primary font-bold tracking-wider">PRINT</button>
        </h1>
        <div className="py-4 px-2 rounded shadow-inner shadow-gray-500/20 bg-white space-y-4">
            <div className="mx-2 px-10 py-3 rounded flex flex-col md:flex-row items-center justify-center space-x-4 text-sm md:text-lg text-center text-primary font-bold tracking-widest bg-slate-100/70">
                <div className="flex flex-col space-y-1 text-sm md:text-base">
                  <span className="px-3 py-0.5 rounded bg-slate-500 text-white w-fit">ELIGIBLE VOTERS</span>
                  <span>{data?.election?.voterData?.length}</span>
                </div>
                <div className="flex flex-col space-y-1 text-sm md:text-base">
                  <span className="px-3 py-0.5 rounded bg-green-600 text-white w-fit">TURNOUT</span>
                  <span>{data?.electors?.length}</span>
                </div>
                <div className="flex flex-col space-y-1 text-sm md:text-base">
                  <span className="px-3 py-0.5 rounded bg-slate-500 text-white w-fit">ABSENT</span>
                  <span>{(data?.election?.voterData?.length - data?.electors?.length)}</span>
                </div>
            </div>
            <div className="px-2 py-2 h-[31rem] bg-zinc-200/50 shadow-inner space-y-3 overflow-y-auto">
                
                { data?.portfolios.map((row:any) => {
                  let winValue = 0;
                  return(
                  <div key={row.id} className="px-2 py-2 flex-1 bg-white rounded space-y-2">
                    <h2 className="px-6 py-1 rounded text-xs md:text-lg text-center text-primary font-extrabold tracking-widest bg-primary-200/70">{row?.title?.toUpperCase()}</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 place-content-start overflow-y-scroll">
                        { row?.candidates?.map((r:any, i: number) => {
                           winValue = r.votes > winValue ? r.votes: winValue;
                           if( r.orderNo == 0 ) return <CandidateCardNo key={r?.id} data={r} vtotal={data?.electors?.length} showResult winner={r.votes == winValue} />
                           return (<CandidateCard key={r?.id} data={r} vtotal={data?.electors?.length} showResult winner={r.votes == winValue} />)}
                         )}
                    </div>
                  </div>
                )})}

            </div>
        </div>
    </div>
  )
}

export default PgResult