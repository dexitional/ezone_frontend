import React from 'react'
import AISPBioCard from '../../components/aisp/AISPBioCard';
import { ImProfile } from 'react-icons/im';
import { FaRegAddressCard, FaRegCalendar } from 'react-icons/fa6';
import { FaPhoneAlt, FaTransgender } from 'react-icons/fa';
import { TbHomeCheck } from 'react-icons/tb';
import { MdOutlineFiberPin, MdOutlineMarkEmailUnread } from 'react-icons/md';
import moment from 'moment';
import { BsCalendarRange } from 'react-icons/bs';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { RiCommunityLine } from 'react-icons/ri';
import Service from '../../utils/aisService'
import { useLoaderData } from 'react-router';
import AISResultCard from '../../components/ais/AISResultCard';


type Props = {}


export async function loader({ params }){
  const data = await Service.fetchStudentTranscript(params.studentId);
  
  let credit = 0;
  let gradepoint = 0;
  const cgpa:any = [];
  Array.from(data).map(([title,row]:any,i: number) => {
    credit += row.reduce((sum,cur) => cur.credit+sum, 0);
    gradepoint += row.reduce((sum,cur) => (cur.credit*cur.gradepoint)+sum,0);
    let gpa = gradepoint/credit;
    cgpa.push(gpa.toFixed(1))
  })
  
  return { data,cgpa }
}

function PgAISStudentTranscript({}: Props) {
  const { data,cgpa } :any = useLoaderData();
  
  return (
  <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-10 ">
    { data && Array.from(data).map(([title,row]:any,i: number) => (
      <AISResultCard index={i} cgpa={cgpa} key={title} title={title.toUpperCase()} data={row} />
    ))}
    { !data.length ? (<div className="p-3 "><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Academic Statement ...</h1></div>) : null}
  </div>
  )
}

export default PgAISStudentTranscript