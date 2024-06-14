import React, { Fragment, useEffect, useMemo, useState } from 'react'
import Service from '../../utils/evsService'
import { redirect, useLoaderData, useNavigate } from 'react-router';
import VotingCard from './VotingCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUserStore } from '../../utils/authService';
import VotingCardNo from './VotingCardNo';

export async function loader({ params }){
  const data = await Service.fetchVotes(params.electionId);
  return { data }
}

function PgVoting() {
  const { data }:any = useLoaderData();
  const user = useUserStore.getState().user
  const [ voter,setVoter ] = useState({})
	const [ ip,setIp ] = useState(null)
	const [ location,setLocation ] = useState('')
	const [ pageview,setPageview ] = useState<number>(0);
  const navigate = useNavigate();
	
	const choose = (e,pid,cid) => {
		e.preventDefault();
    setVoter({ ...voter,[pid]:cid })
		setTimeout(() => changeView('next'),500)
	}

	const chosenIcon = (pid,cid) => {
    return voter[pid] == cid
	}

	const changeView = (action) => {
    if(action == 'prev') setPageview(Math.max(0,pageview-1))
		if(action == 'next') setPageview(Math.min(parseInt(data?.portfolios?.length)-1,pageview+1))
	}

	const pageComplete  = (key) => {
    return voter[key];
	}

	const allowNext  = () => {
		const portfolio = data?.portfolios.find( (r,i) => i == pageview)
		if(portfolio) return voter[portfolio.id];
		return false;
  }

	const allowSubmit = () => {
		const count = data?.portfolios.length
		const vcount = Object.values(voter).length;
		return count == vcount;
	}
	
	const submitVote = async (e) => {
		e.preventDefault();
		const mdata = { id:data?.election?.id, tag:user?.user?.tag, votes:voter && Object.values(voter), ip, location }
		const ok = window.confirm("SUBMIT VOTES FOR SELECTED CANDIDATES ?")
		if(ok){
		  if(allowSubmit()){
			  const resp = await Service.postVotes(data?.election?.id,mdata);
        if(resp) navigate('/evs/dash')
			}else{
				toast.error(`PLEASE FINALIZE SELECTIONS`)
			}
		}
	}

	const getLocation = useMemo(() => async () =>{
        const res = await axios.get(`https://geolocation-db.com/json/`)
        setIp(res.data.IPv4)
		    setLocation(`Country: ${res.data.country_name}, Coordinates: [ Lat ${res.data.latitude}, Long ${res.data.longitude} ] ${res.data?.city && res.data?.city != 'null' && ', City: '+res.data?.city}`)
  },[ip])


	useEffect(() => {
	  getLocation();
	},[]);


  return (
    <div className="py-3 px-3 flex-1 h-full rounded bg-[#f1f1f1]/30 shadow-inner shadow-gray-500/30 space-y-6">
        <h1 className="px-4 py-2.5 flex items-center justify-between text-lg md:text-xl rounded bg-primary/80 font-semibold text-white">
          <span className="text-white">VOTING SESSION</span>
          <button onClick={() => setPageview(0)} className="p-0.5 px-2 rounded bg-purple-50 text-base text-primary font-bold tracking-wider">START AGAIN</button>
        </h1>
        <div className="py-4 px-2 rounded shadow-inner shadow-gray-500/20 bg-white space-y-4">
        <div className="pt-2 flex items-center justify-center space-x-2">
              { data?.portfolios?.map((row:any, i:number) => 
                <div className={`h-4 w-4 md:h-6 md:w-6 rounded-full border-4 ${0 == i ? 'bg-primary/80':'bg-slate-100'} `}></div>
              )}
            </div>
            <div className="px-2 py-2 h-[35rem] bg-zinc-200/50 shadow-inner space-y-3 overflow-y-auto">
                
                { data?.portfolios.map((row:any, i: number) => 
                 pageview == i ?
                ( <Fragment>
                  <div key={row.id} className="px-2 py-2 flex-1 bg-white rounded space-y-2">
                    <h2 className="relative px-6 py-1 rounded text-xs md:text-lg text-center text-primary font-extrabold tracking-widest bg-slate-200/70">
                      <span>{row?.title?.toUpperCase()}</span>
                      <button onClick={(e)=> choose(e,row?.id,(row?.candidates?.find((m:any) => m.orderNo == 0)?.id))} className="absolute right-4 top-1/2 -translate-y-[50%] px-3 py-0.5 bg-red-100 border-2 border-red-300 text-sm">SKIP</button>
                    </h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 place-content-start overflow-y-scroll">
                        { row?.candidates?.sort((a,b) => a.orderNo - b.orderNo)?.filter((m:any) => m.orderNo != 0)?.map((r:any, i: number) => {
                           if(chosenIcon(row?.id,r?.id) ) return <button key={r?.id} onClick={(e)=> choose(e,row?.id,r?.id)}><VotingCard key={r?.id} data={r} chosen /></button>
                           return (<button key={r?.id} onClick={(e)=> choose(e,row?.id,r?.id)}><VotingCard data={r} /></button>)}
                        )}
                        { row?.candidates?.length == 2 ? (
                          chosenIcon( row?.id, row?.candidates?.find((m:any) => m.orderNo == 0)?.id ) 
                          ? <button onClick={(e)=> choose( e, row?.id, row?.candidates?.find((m:any) => m.orderNo == 0)?.id )}><VotingCardNo data={(row?.candidates?.find((m:any) => m.orderNo == 0))} chosen /></button>
                          : <button onClick={(e)=> choose( e, row?.id, row?.candidates?.find((m:any) => m.orderNo == 0)?.id )}><VotingCardNo data={(row?.candidates?.find((m:any) => m.orderNo == 0))} /></button>
                        ): null }
                    </div>
                  </div>
                  
                  { (allowSubmit() && i == data?.portfolios?.length - 1 )&& <button onClick={(e) => submitVote(e)} className="px-6 py-2 md:py-5 my-2 md:my-10 rounded bg-green-400 text-primary/90 w-full font-bold text-xl animate-pulse">SUBMIT FINAL VOTE</button> }
            
                  </Fragment>
                ) : null )}
            </div>
        </div>
    </div>
  )
}

export default PgVoting