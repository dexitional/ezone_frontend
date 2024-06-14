import React from 'react'
import { MdOutlineAddTask, MdOutlineDashboard, MdPassword } from 'react-icons/md'
import { CiUser } from "react-icons/ci";
import { PiLockKey } from "react-icons/pi";
import { useUserStore } from '../../utils/authService'
import AISPNavItem from './AISPNavItem'

type Props = {
  user: any;
}

function AISPNav({ user }: Props) {
  const lasRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'las')
  return (
    <div className="py-4 flex-1 flex flex-col space-y-1 md:space-y-3">
        {/* <AISPNavItem title="Dashboard" url="dash" Icon={MdOutlineDashboard} /> */}
        <AISPNavItem title="My Profile" url="profile" Icon={CiUser} />
        <AISPNavItem title="Fees & Charges" url="fees" Icon={MdOutlineAddTask} />
        <AISPNavItem title="Results Statement" url="results" Icon={MdOutlineAddTask} />
        <AISPNavItem title="Registration" url="registration" Icon={MdOutlineAddTask} />
        {/* <AISPNavItem title="MLK Circulars" url="notices" Icon={MdOutlineAddTask} /> */}
        {/* <NSSNavItem title="Discipline Cases" url="disciplinary" Icon={GoBriefcase} /> */}
        {/* <AISPNavItem title="Service Requests" url="services" Icon={MdOutlineAddTask} /> */}
        {/* <NSSNavItem title="Release Letter " url="release" Icon={SlEnvolopeLetter} /> */}
        <AISPNavItem title="Change Password" url="changepwd" Icon={PiLockKey} />

    </div>
  )
}

export default AISPNav