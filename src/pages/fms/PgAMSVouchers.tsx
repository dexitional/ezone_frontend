import React, { useState } from 'react'
import PageTitle from '../../components/ams/PageTitle'
import Service from '../../utils/amsService'
import { redirect, useLoaderData } from 'react-router'
import VoucherListView from '../../components/ams/VoucherListView'
import VoucherCardItem from '../../components/ams/VoucherCardItem'
type Props = {}

export async function action({ request,params }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  if(pathname.endsWith('reset')){
     await Service.deleteVoucher(params.voucherId);
  } else {
    await Service.recoverVoucher(params.voucherId);
  }
  return redirect(`/ams/vouchers?search=${params.voucherId}`);
}

export async function loader({ request }) {
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = new URL(request.url).searchParams.get('page') || 1;
  const data = await Service.fetchVouchers(search,page);
  return { data, search, page }
}

function PgAMSVouchers({}: Props) {
  const [ view, setView ] = useState('card')
  const { data: { data, totalPages,totalData }, page, search }: any = useLoaderData()
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Vouchers" createtext="New" createlink="create" pages={totalPages} setView={setView} view={view} />
      <div className="">
         { view == 'card' && (
            <div className="grid md:grid-cols-3 gap-3 md:gap-6">
              { data && data?.map((row:any) => (<VoucherCardItem key={row.serial} data={row} /> ))}
              { !data && (<div className="p-3 border rounded-xl"><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Records ...</h1></div>)}
            </div>
          )}

         { view == 'list' && (
           <VoucherListView data={data} />
         )}
         
      </div>
    </div>
  )
}

export default PgAMSVouchers