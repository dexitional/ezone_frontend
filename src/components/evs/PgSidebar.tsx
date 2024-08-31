import React, { useEffect, useState } from 'react'
import Logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom'
import EVSNavItem from './EVSNavItem'
import Service from '../../utils/evsService'

const { REACT_APP_API_URL } = import.meta.env;

type Props = {
  data: any;
}

function PgSidebar({ data }: Props) {
  const { isAdmin } = data;
  const [ dm, setDm ] = useState<any>(data);
  const loadData = () => {
    setInterval( async() => {
      const vs = await Service.fetchElection(data?.id);
      setDm(vs)
    }, 10000)
    
  }
  useEffect(() => {
     loadData();
  },[])

  return (
    <div className="p-4 md:py-6 md:px-3 w-full md:w-64 h-fit rounded bg-[#f1f1f1]/30 shadow-inner shadow-gray-500/30 space-y-6">
        <img src={`${REACT_APP_API_URL}/auth/pixo?eid=${data?.id}` || Logo} alt="" className="mx-auto w-28 h-28 object-contain"/>
        <Link to="../dash"><button className="mt-4 py-2 w-full rounded-lg bg-primary/90 font-bold text-sm text-amber-200 text-center">GOTO ELECTIONS PAGE</button></Link>
        <div className="py-3 rounded shadow-inner shadow-gray-500/20 bg-white space-y-4">
            <h3 className="py-1 bg-primary/80 font-bold text-lg text-white text-center">VOTER TURNOUT</h3>
            <p className='text-2xl md:text-4xl text-center text-primary font-bold'>{dm?.turnout}</p>
        </div>
        <div className="p-3 rounded shadow-inner shadow-gray-500/20 bg-white space-y-2">
            <EVSNavItem url="candidate" title="CANDIDATES VIEW" />
            <EVSNavItem url="register" title="VOTERS REGISTER" />
            { dm?.allowMonitor || (dm?.allowEcMonitor && isAdmin) ? <EVSNavItem url="public" title="PUBLIC MONITOR" /> : null }
            { dm?.allowVip || (dm?.allowEcVip && isAdmin) ? <EVSNavItem url="vip" title="STRONG ROOM" /> : null }
            { isAdmin ? <EVSNavItem url="control" title="ADMIN CONTROLS" /> : null }
            { (dm?.allowResult && dm?.action == 'ENDED') || (dm?.allowEcResult && dm?.action == 'ENDED'  && isAdmin) ? <EVSNavItem url="result" title="FINAL RESULTS" /> : null }
          </div>
    </div>
  )
}

export default PgSidebar