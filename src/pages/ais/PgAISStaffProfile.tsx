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


type Props = {}

export async function loader({ params }){
   const data = await Service.fetchStaff(params.staffId)
   return { data }
}

function PgAISStaffProfile({}: Props) {
  const { data } :any = useLoaderData();
  console.log(data)
  
  return (
    <div className="flex w-full flex-1 flex-col md:flex-row space-between space-y-2 md:space-y-0 md:space-x-10">
      <div className="flex-1 space-y-2">
        <AISPBioCard label="Full Name" value={`${data?.title?.label? data.title.label+ '. ' : ''}${data?.fname} ${data?.mname && data?.mname+' '}${data?.lname}`} Icon={ImProfile} />
        <AISPBioCard label="Gender" value={data?.gender == 'M' ? 'MALE':'FEMALE'} Icon={FaTransgender} />
        <AISPBioCard label="Date of Birth" value={data?.dob && moment(data?.dob).format('MMMM DD, YYYY').toUpperCase() || 'Not Set'} Icon={FaRegCalendar} />
        <AISPBioCard label="Place of Birth" value={data?.birthplace?.toUpperCase() || 'Not Set'} Icon={TbHomeCheck} />
        <AISPBioCard label="Hometown" value={data?.hometown?.toUpperCase() || 'Not Set'} Icon={TbHomeCheck} />
        <AISPBioCard label="District" value={data?.district?.toUpperCase() || 'Not Set'} Icon={TbHomeCheck} />
        <AISPBioCard label="Phone Number" value={data?.phone || 'Not Set'} Icon={FaPhoneAlt} />
        <AISPBioCard label="Email Address" value={data?.email?.toUpperCase() || 'Not Set'} Icon={MdOutlineMarkEmailUnread} />
        <AISPBioCard label="Residential Address" value={data?.residentAddress?.toUpperCase() || 'Not Set'} Icon={FaRegAddressCard} />
        <AISPBioCard label="Marital Status" value={data?.marital?.title?.toUpperCase() || 'Not Set'} Icon={FaRegAddressCard} />
        <AISPBioCard label="Occupation" value={data?.occupation?.toUpperCase() || 'Not Set'} Icon={MdOutlineFiberPin} />
      </div>
      <div className="flex-1 space-y-2">
        <AISPBioCard label="Region" value={data?.region?.title || 'Not Set'} Icon={BiMoneyWithdraw} />
        <AISPBioCard label="Country" value={data?.country?.longName || 'Not Set'} Icon={RiCommunityLine} />
        <AISPBioCard label="Religion" value={data?.religion?.title || 'Not Set'} Icon={BiMoneyWithdraw} />
        <AISPBioCard label="Disability" value={data?.disabilities || 'None'} Icon={BiMoneyWithdraw} />
        <AISPBioCard label="Staff Number" value={`${data?.staffNo}`} Icon={ImProfile} />
        <AISPBioCard label="SSNIT Number" value={data?.ssnitNo || 'Not Set'} Icon={TbHomeCheck} />
        <AISPBioCard label="Ghana Card Number" value={data?.ghcardNo || 'Not Set'} Icon={MdOutlineMarkEmailUnread} />
        <AISPBioCard label="Designation" value={data?.job?.title?.toUpperCase() || 'Not Set'} Icon={MdOutlineMarkEmailUnread} />
        <AISPBioCard label="Department" value={data?.unit?.title?.toUpperCase() || 'Not Set'} Icon={FaPhoneAlt} />
        <AISPBioCard label="Institutional Email" value={data?.instituteEmail?.toUpperCase() || 'Not Set'} Icon={FaRegAddressCard} />
      </div>
    </div>
  )
}

export default PgAISStaffProfile