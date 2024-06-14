import React, { useState } from 'react'
import PageTitle from '../../components/las/PageTitle'
import Service from '../../utils/hrsService'
import { redirect, useLoaderData } from 'react-router'
import NoticeListView from '../../components/aisp/NoticeListView'

type Props = {}

export async function loader() {
  const data = await Service.fetchNSSNotices();
  return { data }
}

function PgAISPNotices({}: Props) {
  const { data }: any = useLoaderData()

  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="NSS Notices" createtext="" createlink="" setView={()=> null} view={''} />
      <div className="">
        <NoticeListView data={data} />
      </div>
    </div>
  )
}

export default PgAISPNotices