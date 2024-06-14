import React, { useState } from 'react'
import PgSidebar from '../../components/evs/PgSidebar'
import EVSHeader from '../../components/evs/EVSHeader'
import Loader from '../../components/Loader'
import { Outlet, useLoaderData, useNavigation } from 'react-router'
import { useUserStore } from '../../utils/authService'
import Service from '../../utils/evsService'
import useSWR, { preload } from 'swr'

export async function loader({ params }){
  const user = useUserStore.getState().user
  const data = await Service.fetchElection(params.electionId);
  const isAdmin = data?.admins?.find(r => r?.toLowerCase() == user?.user?.tag?.toLowerCase())
  return {  data: {...data, isAdmin: !!isAdmin } }
}

function EVSPage() {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  const { data }:any = useLoaderData();

 
  return (
    <main className="w-full flex flex-col overflow-y-scroll">
      <EVSHeader data={data} />
      <section className="mx-1.5 md:mx-auto py-6 w-full md:max-w-6xl flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* { SwitchPage()} */}
          <div className={`${loading && 'overflow-hidden'} flex-1`}>
            { loading && <Loader /> }
            <Outlet />
          </div>
          <PgSidebar data={data} />
          
      </section>
    </main>
  )
}

export default EVSPage