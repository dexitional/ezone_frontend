import React, { useEffect, useState } from 'react'
import PgElectionCard from '../../components/evs/PgElectionCard'
import Service from '../../utils/evsService'
import { useUserStore } from '../../utils/authService';
import { useLoaderData } from 'react-router';

export async function loader({ params }){
  const { user } = useUserStore.getState();
  const data = await Service.fetchMyElections(user?.user?.tag?.toString());
  return { data }
}

function EVSDashPage() {

  const { data:mdata,user }:any = useLoaderData() || [];
  const [ data, setData ] = useState(mdata);
  const loadData = async () => {
     const dm = await Service.fetchMyElections(user?.user?.tag?.toString());
     console.log(dm)
     if(dm && dm?.length) setData(dm)
  }
  
  useEffect(() => {
    setInterval(async () => await loadData(), 30000)
  },[])

  return (
    <main className="px-2 md:px-0 w-full flex flex-col overflow-y-scroll">
       <section className="md:mx-auto py-6 w-full md:max-w-6xl">
          <div className="px-2 py-2 md:py-2 md:px-3 w-full rounded bg-[#f1f1f1]/30 shadow-inner shadow-gray-500/30 space-y-6">
            <div className="py-1 text-center text-xl md:text-4xl text-gray-400/80 bg-gradient-to-r from-slate-50 via-white to-slate-50 font-black font-mono tracking-wide">ELECTA VOTING SYSTEM</div>
          </div>
       </section>
       <section className="md:mx-auto py-6 w-full md:max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-10">
          { data && data?.map((row:any, i:number ) => (<PgElectionCard key={i} data={row} />))}
          { !data && <div className="px-4 py-2 mx-auto w-fit rounded-lg border bg-slate-100 text-gray-600 text-center font-medium tracking-wide text-xl">No election staged !!</div>}
       </section>
    </main>
   
  )
}

export default EVSDashPage